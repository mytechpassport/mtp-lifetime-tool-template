import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCreditBalance,
  getCreditPacks,
  getCreditTransactions,
  purchaseCredits,
} from "@/services/api/credits";
import { getApiErrorMessage } from "@/utils/apiError";

export const creditQueryKeys = {
  balance: () => ["credits", "balance"],
  packs: () => ["credits", "packs"],
  transactions: () => ["credits", "transactions"],
};

export const useCreditBalance = () => {
  const query = useQuery({
    queryKey: creditQueryKeys.balance(),
    queryFn: async () => {
      const response = await getCreditBalance();
      return response.data;
    },
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const useCreditPacks = () => {
  const query = useQuery({
    queryKey: creditQueryKeys.packs(),
    queryFn: async () => {
      const response = await getCreditPacks();
      return response.data;
    },
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const useCreditTransactions = () => {
  const query = useQuery({
    queryKey: creditQueryKeys.transactions(),
    queryFn: async () => {
      const response = await getCreditTransactions();
      return response.data.items;
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const usePurchaseCredits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchaseCredits,
    onSuccess: () => {
      toast.success("Credit purchase started.");
      queryClient.invalidateQueries({ queryKey: ["credits"] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
};
