import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BuyCreditsModal } from "@/components/dashboard/BuyCreditsModal";
import { useCreditBalance, useCreditTransactions } from "@/hooks/api/useCredits";
import { formatUtcToUserTimezone } from "@/lib/date-utils";
import { formatNumber } from "@/lib/format";

export const CreditBalance = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { data: balanceData, isLoading: isBalanceLoading } = useCreditBalance();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useCreditTransactions();

  useEffect(() => {
    const status = searchParams.get("credits");
    if (!status) return;

    if (status === "success") {
      toast.success("Credits added successfully.");
      queryClient.invalidateQueries({ queryKey: ["credits"] });
    }
    if (status === "cancelled") {
      toast.error("Credit purchase cancelled.");
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("credits");
    setSearchParams(nextParams, { replace: true });
  }, [queryClient, searchParams, setSearchParams]);

  const balance = balanceData?.balance ?? 0;
  const recentTransactions = useMemo(
    () => transactions?.slice(0, 10) ?? [],
    [transactions]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Credits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {isBalanceLoading ? (
            <Skeleton height={32} width={120} />
          ) : (
            <p className="text-3xl font-bold">{formatNumber(balance)}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Credits available across all tools
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <BuyCreditsModal>
            <Button>Buy Credits</Button>
          </BuyCreditsModal>
          <Button variant="outline" onClick={() => setHistoryOpen(true)}>
            View transactions
          </Button>
        </div>
      </CardContent>

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Credit Transactions</DialogTitle>
          </DialogHeader>
          {isTransactionsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={`credit-tx-${index}`} height={32} />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No credit transactions yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {formatUtcToUserTimezone(transaction.createdAt)}
                      </TableCell>
                      <TableCell className="capitalize">
                        {transaction.type}
                      </TableCell>
                      <TableCell>
                        {transaction.description ?? "No description"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {transaction.amount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};
