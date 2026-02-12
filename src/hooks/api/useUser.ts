import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCurrentUser } from "@/services/api/users";
import { getApiErrorMessage } from "@/utils/apiError";

export const userQueryKeys = {
  current: () => ["user", "current"],
};

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: userQueryKeys.current(),
    queryFn: async () => {
      const response = await getCurrentUser();
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
