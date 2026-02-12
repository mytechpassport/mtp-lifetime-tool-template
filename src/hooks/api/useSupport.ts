import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createSupportTicket,
  getSupportTicket,
  getSupportTickets,
  replyToSupportTicket,
  resolveSupportTicket,
} from "@/services/api/support";
import { getApiErrorMessage } from "@/utils/apiError";

export const supportQueryKeys = {
  tickets: () => ["support", "tickets"],
  ticket: (ticketId: number | string) => ["support", "tickets", ticketId],
};

export const useSupportTickets = () => {
  const query = useQuery({
    queryKey: supportQueryKeys.tickets(),
    queryFn: async () => {
      const response = await getSupportTickets();
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data.items ?? [];
    },
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const useSupportTicket = (ticketId: number | string) => {
  const query = useQuery({
    queryKey: supportQueryKeys.ticket(ticketId),
    queryFn: async () => {
      const response = await getSupportTicket(ticketId);
      return response.data;
    },
    enabled: Boolean(ticketId),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const useCreateSupportTicket = () =>
  useMutation({
    mutationFn: createSupportTicket,
    onSuccess: () => toast.success("Support ticket submitted."),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

export const useReplySupportTicket = () =>
  useMutation({
    mutationFn: ({
      ticketId,
      message,
    }: {
      ticketId: number | string;
      message: string;
    }) => replyToSupportTicket(ticketId, { message }),
    onSuccess: () => toast.success("Reply sent to support."),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

export const useResolveSupportTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId }: { ticketId: number | string }) =>
      resolveSupportTicket(ticketId),
    onSuccess: (_, variables) => {
      toast.success("Ticket marked as resolved.");
      queryClient.invalidateQueries({
        queryKey: supportQueryKeys.ticket(variables.ticketId),
      });
      queryClient.invalidateQueries({ queryKey: supportQueryKeys.tickets() });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
};
