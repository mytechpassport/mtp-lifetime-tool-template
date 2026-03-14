import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCurrentSubscription } from "@/services/api/subscription";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/utils/apiError";

export const subscriptionQueryKeys = {
  current: () => ["subscription", "current"],
};

/**
 * Fetches the current user's subscription and plan features.
 * Only runs when the user is logged in.
 * Plan features (mtpToolsFree, etc.) are set by admins and checked dynamically —
 * no hardcoded plan logic here so admin changes propagate automatically.
 */
export const useSubscription = () => {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: subscriptionQueryKeys.current(),
    queryFn: getCurrentSubscription,
    enabled: Boolean(user),
    retry: 1,
    staleTime: 60_000, // 1 min — plan rarely changes mid-session
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};
