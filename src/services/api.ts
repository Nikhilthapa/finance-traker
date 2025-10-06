// API service with placeholder functions for backend integration

const API_BASE_URL = "https://rbac-tech-bridge.vercel.app";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth endpoints
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Transaction endpoints
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  description: string;
  date: string;
  userId: string;
}

export const getTransactions = async (params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams(params as any).toString();
  // const response = await fetch(
  //   `${API_BASE_URL}/user/transactions?${queryParams}`,
  //   {
  //     headers: getAuthHeaders(),
  //   }
  // );
  const response = await fetch(
    `https://rbac-tech-bridge.vercel.app/user/transactions`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  console.log("thsi is response", response);

  return response.json();
};

export const addTransaction = async (
  data: Omit<Transaction, "id" | "userId">
) => {
  const response = await fetch(
    `https://rbac-tech-bridge.vercel.app/user/add/transactions`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>
) => {
  const response = await fetch(
    `${API_BASE_URL}/user/update/transactions/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const deleteTransaction = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/del/transactions/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Analytics endpoints
export interface AnalyticsData {
  categoryExpenses: { category: string; amount: number }[];
  monthlyTrends: { month: string; income: number; expenses: number }[];
  incomeVsExpense: { income: number; expenses: number };
  totalBalance: number;
}

export const getAnalytics = async () => {
  // const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
  //   headers: getAuthHeaders(),
  // });
  const response = await fetch(
    `https://rbac-tech-bridge.vercel.app/user/dashboard`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.json();
};
