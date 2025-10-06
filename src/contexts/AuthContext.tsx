import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "admin" | "user" | "read-only";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface FirstTimeLogin {
  firstTime: string;
}
interface AuthContextType {
  firstTime: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role?: UserRole
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firstTime, setfirstTime] = useState<boolean | null>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // console.log("checking this one", storedToken);
    const storedUser = localStorage.getItem("user");
    // console.log("stored user", storedUser);
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      // Placeholder API call - replace with actual endpoint
      const response = await fetch(
        `https://rbac-tech-bridge.vercel.app/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );
      console.log("this is response", response);

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole = "user"
  ) => {
    setIsLoading(true);
    try {
      // Placeholder API call - replace with actual endpoint
      const response = await fetch(
        `https://rbac-tech-bridge.vercel.app/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      // console.log("this is data", data);
      // if (data) localStorage.setItem("firsttime", "true");
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, isLoading, firstTime }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
