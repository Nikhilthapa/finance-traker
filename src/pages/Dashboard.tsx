import {
  lazy,
  Suspense,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart as PieChartIcon,
} from "lucide-react";
import { getAnalytics, AnalyticsData } from "@/services/api";

// Lazy load chart components
const ExpensesPieChart = lazy(
  () => import("@/components/charts/ExpensesPieChart")
);
const MonthlyTrendsChart = lazy(
  () => import("@/components/charts/MonthlyTrendsChart")
);
const IncomeVsExpenseChart = lazy(
  () => import("@/components/charts/IncomeVsExpenseChart")
);

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);
console.log("I am talking inside ChartSkeleton");

const Dashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("I am talking inside dashboard");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      const analyticsData = await getAnalytics();
      setData(analyticsData);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      // Use mock data for demo
      setData({
        categoryExpenses: [
          { category: "Food", amount: 450 },
          { category: "Transport", amount: 200 },
          { category: "Entertainment", amount: 150 },
          { category: "Utilities", amount: 300 },
          { category: "Shopping", amount: 250 },
        ],
        monthlyTrends: [
          { month: "Jan", income: 3000, expenses: 2200 },
          { month: "Feb", income: 3200, expenses: 2400 },
          { month: "Mar", income: 3100, expenses: 2100 },
          { month: "Apr", income: 3300, expenses: 2500 },
          { month: "May", income: 3400, expenses: 2300 },
          { month: "Jun", income: 3500, expenses: 2600 },
        ],
        incomeVsExpense: { income: 19500, expenses: 14100 },
        totalBalance: 5400,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;

    const totalExpenses = data.categoryExpenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const savingsRate =
      data.incomeVsExpense.income > 0
        ? (
            ((data.incomeVsExpense.income - data.incomeVsExpense.expenses) /
              data.incomeVsExpense.income) *
            100
          ).toFixed(1)
        : 0;

    return {
      totalExpenses,
      savingsRate,
    };
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto p-6">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Financial Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${data.totalBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current balance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Income
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${data.incomeVsExpense.income.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                ${stats?.totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Savings Rate
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.savingsRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Of total income
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Suspense fallback={<ChartSkeleton />}>
            <ExpensesPieChart data={data.categoryExpenses} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <IncomeVsExpenseChart data={data.incomeVsExpense} />
          </Suspense>
        </div>

        <div className="grid gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <MonthlyTrendsChart data={data.monthlyTrends} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
