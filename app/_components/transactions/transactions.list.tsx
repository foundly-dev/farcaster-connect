"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionsStore } from "./transactions.store";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export const TransactionsList = () => {
  const transactions = useTransactionsStore((state) => state.transactions);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-start gap-3 p-3 rounded-lg border bg-card"
          >
            <div className="flex-shrink-0 mt-0.5">
              {tx.status === "approved" && (
                <CheckCircle2 className="size-5 text-green-600" />
              )}
              {tx.status === "rejected" && (
                <XCircle className="size-5 text-red-600" />
              )}
              {tx.status === "pending" && (
                <Clock className="size-5 text-yellow-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold text-sm truncate">{tx.method}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(tx.timestamp).toLocaleTimeString()}
                </span>
              </div>

              <div className="mt-1">
                <p className="text-xs text-muted-foreground capitalize">
                  Status: {tx.status}
                </p>
                {tx.error && (
                  <p className="text-xs text-red-600 mt-1">Error: {tx.error}</p>
                )}
              </div>

              {tx.params && (
                <details className="mt-2">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:underline">
                    View Details
                  </summary>
                  <pre className="text-xs mt-2 p-2 bg-muted rounded overflow-x-auto">
                    {JSON.stringify(tx.params, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
