import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IncomeVsExpenseChartProps {
  data: { income: number; expenses: number };
}

const IncomeVsExpenseChart = ({ data }: IncomeVsExpenseChartProps) => {
  const chartData = useMemo(() => [
    { name: 'Total', income: data.income, expenses: data.expenses },
  ], [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="income" fill="hsl(var(--chart-2))" name="Income" />
            <Bar dataKey="expenses" fill="hsl(var(--chart-3))" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeVsExpenseChart;
