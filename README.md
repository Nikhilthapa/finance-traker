# Finance Tracker

A modern, full-stack finance tracking application built with React and TypeScript. Track your income and expenses, visualize financial trends, and manage your budget effectively.

## Features

- 📊 **Dashboard Analytics** - Visual insights into your financial data with interactive charts
- 💰 **Transaction Management** - Add, edit, and delete income/expense transactions
- 👥 **Role-Based Access** - Support for User, Admin, and Read-Only roles
- 🔐 **Secure Authentication** - Email/password authentication with role selection
- 📈 **Financial Insights** - Monthly trends, category-wise expenses, and income vs expense analysis
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Lovable Cloud** - Backend infrastructure
- **Authentication** - Secure user authentication
- **Database** - Data persistence
- **API Integration** - External API connectivity

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── charts/         # Chart components
│   ├── Navigation.tsx  # Navigation component
│   ├── ProtectedRoute.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
├── integrations/       # External integrations
│   └── supabase/      # Supabase client and types
├── lib/               # Utility functions
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Transactions.tsx
│   └── NotFound.tsx
├── services/          # API services
│   └── api.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and design tokens
```

## User Roles

- **User** - Manage your finances, add/edit/delete transactions
- **Admin** - Full access to all features and data
- **Read-Only** - View-only access to financial data

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Dashboard
- Overview of total balance, income, and expenses
- Interactive charts showing:
  - Monthly trends
  - Category-wise expense breakdown
  - Income vs Expense comparison

### Transactions
- Add new transactions with details:
  - Amount
  - Category
  - Type (Income/Expense)
  - Description
  - Date
- Edit existing transactions
- Delete transactions
- Filter and search functionality

### Authentication
- Secure login with email and password
- Account type selection during signup
- Role-based access control
- Protected routes

## Design System

The application uses a semantic token-based design system with:
- Custom CSS variables for colors (HSL format)
- Tailwind CSS for styling
- Dark mode support
- Responsive breakpoints
- Consistent spacing and typography

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using [Lovable](https://lovable.dev)
