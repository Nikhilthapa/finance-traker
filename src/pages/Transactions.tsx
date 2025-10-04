import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { TransactionList } from '@/components/TransactionList';
import { TransactionForm } from '@/components/TransactionForm';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { getTransactions, Transaction } from '@/services/api';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const isReadOnly = user?.role === 'read-only';

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
      // Mock data for demo
      setTransactions([
        {
          id: '1',
          amount: 50,
          category: 'Food',
          type: 'expense',
          description: 'Grocery shopping',
          date: '2025-01-15',
          userId: user?.id || '',
        },
        {
          id: '2',
          amount: 3000,
          category: 'Salary',
          type: 'income',
          description: 'Monthly salary',
          date: '2025-01-01',
          userId: user?.id || '',
        },
        {
          id: '3',
          amount: 30,
          category: 'Transport',
          type: 'expense',
          description: 'Uber ride',
          date: '2025-01-20',
          userId: user?.id || '',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, categoryFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((t) => t.category));
    return Array.from(unique);
  }, [transactions]);

  const handleTransactionSaved = useCallback(() => {
    loadTransactions();
    setIsDialogOpen(false);
    setEditingTransaction(null);
    toast.success(editingTransaction ? 'Transaction updated' : 'Transaction added');
  }, [editingTransaction, loadTransactions]);

  const handleEdit = useCallback((transaction: Transaction) => {
    if (isReadOnly) {
      toast.error('You do not have permission to edit transactions');
      return;
    }
    setEditingTransaction(transaction);
    setIsDialogOpen(true);
  }, [isReadOnly]);

  const handleDelete = useCallback(async (id: string) => {
    if (isReadOnly) {
      toast.error('You do not have permission to delete transactions');
      return;
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.success('Transaction deleted');
  }, [isReadOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={isReadOnly} onClick={() => setEditingTransaction(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
                </DialogTitle>
              </DialogHeader>
              <TransactionForm
                transaction={editingTransaction}
                onSave={handleTransactionSaved}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingTransaction(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transaction List */}
        <TransactionList
          transactions={paginatedTransactions}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isReadOnly={isReadOnly}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Transactions;
