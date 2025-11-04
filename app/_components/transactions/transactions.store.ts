import { create } from "zustand";

export type TransactionStatus = "pending" | "approved" | "rejected";

export interface Transaction {
  id: string;
  topic: string;
  timestamp: number;
  method: string;
  params: any;
  status: TransactionStatus;
  result?: any;
  error?: string;
}

interface TransactionsStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "timestamp" | "status">) => void;
  updateTransactionStatus: (
    id: string,
    status: TransactionStatus,
    result?: any,
    error?: string
  ) => void;
  clearTransactions: () => void;
}

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          ...transaction,
          timestamp: Date.now(),
          status: "pending",
        },
        ...state.transactions,
      ],
    })),
  updateTransactionStatus: (id, status, result, error) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, status, result, error } : tx
      ),
    })),
  clearTransactions: () => set({ transactions: [] }),
}));
