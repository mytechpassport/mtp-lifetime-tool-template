import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateSupportTicket,
  useResolveSupportTicket,
  useReplySupportTicket,
  useSupportTicket,
  useSupportTickets,
} from "@/hooks/api/useSupport";
import { formatUtcToUserTimezone } from "@/lib/date-utils";

const supportCategories = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing & Payments" },
  { value: "account", label: "Account Management" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

const Support = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ticketIdParam = searchParams.get("ticketId");
  const [formState, setFormState] = useState({
    subject: "",
    category: "",
    description: "",
  });
  const [replyMessage, setReplyMessage] = useState("");

  const ticketsQuery = useSupportTickets();
  const ticketQuery = useSupportTicket(ticketIdParam ?? "");
  const createTicket = useCreateSupportTicket();
  const replyTicket = useReplySupportTicket();
  const resolveTicket = useResolveSupportTicket();

  const tickets = ticketsQuery.data ?? [];
  const selectedTicket = ticketQuery.data;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.subject || !formState.description) {
      toast.error("Subject and description are required.");
      return;
    }

    await createTicket.mutateAsync({
      subject: formState.subject,
      message: formState.description,
      category: formState.category,
    });

    setFormState({ subject: "", category: "", description: "" });
    ticketsQuery.refetch();
  };

  const handleReply = async () => {
    if (!ticketIdParam || !replyMessage.trim()) return;
    await replyTicket.mutateAsync({
      ticketId: ticketIdParam,
      message: replyMessage.trim(),
    });
    setReplyMessage("");
    ticketQuery.refetch();
  };

  const handleResolve = async () => {
    if (!ticketIdParam) return;
    await resolveTicket.mutateAsync({ ticketId: ticketIdParam });
    ticketQuery.refetch();
    ticketsQuery.refetch();
  };

  const openTicket = (ticketId: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("ticketId", String(ticketId));
    setSearchParams(nextParams, { replace: true });
  };

  const closeTicket = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("ticketId");
    setSearchParams(nextParams, { replace: true });
  };

  const ticketStatusVariant = useMemo(() => {
    if (!selectedTicket?.status) return "secondary";
    if (selectedTicket.status === "resolved") return "default";
    if (selectedTicket.status === "closed") return "outline";
    return "secondary";
  }, [selectedTicket?.status]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">
          Submit issues and track your support conversations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Ticket</CardTitle>
          <CardDescription>
            Describe the issue and our team will respond within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formState.subject}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      subject: event.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formState.category}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      category: event.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select a category</option>
                  {supportCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                required
              />
            </div>
            <Button type="submit" disabled={createTicket.isPending}>
              {createTicket.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit ticket
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
          <CardDescription>
            View all tickets you have submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ticketsQuery.isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={`ticket-skeleton-${index}`} height={48} />
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No support tickets yet.
            </p>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">#{ticket.id}</span>
                      <Badge variant={ticket.status === "resolved" ? "default" : "secondary"}>
                        {ticket.status}
                      </Badge>
                      {ticket.category && (
                        <Badge variant="outline">{ticket.category}</Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      Created{" "}
                      {formatUtcToUserTimezone(
                        ticket.createdAt ?? (ticket as { created_at?: string }).created_at ?? ""
                      )}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openTicket(ticket.id)}>
                    View details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(ticketIdParam)}
        onOpenChange={(open) => {
          if (!open) closeTicket();
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
          </DialogHeader>
          {ticketQuery.isLoading ? (
            <div className="space-y-3">
              <Skeleton height={24} />
              <Skeleton height={80} />
            </div>
          ) : selectedTicket ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={ticketStatusVariant}>
                  {selectedTicket.status}
                </Badge>
                  <span className="text-xs text-muted-foreground">
                    Created{" "}
                    {formatUtcToUserTimezone(
                      selectedTicket.createdAt ??
                        (selectedTicket as { created_at?: string }).created_at ??
                        ""
                    )}
                  </span>
              </div>
              <div>
                <p className="text-sm font-medium">{selectedTicket.subject}</p>
              </div>
              <div className="space-y-3">
                {(selectedTicket.messages ?? []).map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.senderType === "user"
                        ? "bg-primary/10 ml-6"
                        : "bg-muted mr-6"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground mb-2">
                      {message.senderType === "user" ? "You" : "Support"} -{" "}
                      {formatUtcToUserTimezone(message.createdAt)}
                    </p>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
              </div>

              {selectedTicket.status !== "resolved" &&
              selectedTicket.status !== "closed" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="outline"
                      onClick={handleResolve}
                      disabled={resolveTicket.isPending}
                    >
                      {resolveTicket.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Mark as resolved
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reply-message">Add a reply</Label>
                    <Textarea
                      id="reply-message"
                      rows={3}
                      value={replyMessage}
                      onChange={(event) => setReplyMessage(event.target.value)}
                    />
                    <div className="flex items-center justify-end">
                      <Button
                        onClick={handleReply}
                        disabled={replyTicket.isPending}
                      >
                        {replyTicket.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send reply
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Ticket not found.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
