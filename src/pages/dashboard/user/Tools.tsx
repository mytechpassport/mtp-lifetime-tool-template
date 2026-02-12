import { useMemo } from "react";
import { Link } from "react-router-dom";
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
import { useConnectTool, useTools } from "@/hooks/api/useTools";
import { buildToolSubdomainFullUrl } from "@/lib/toolUrl";
import type { ToolCatalogItem } from "@/types/mtp";

const resolveToolUrl = (tool: ToolCatalogItem): string | null => {
  if (tool.externalUrl) return tool.externalUrl;
  if (!tool.subdomainUrl) return null;
  return buildToolSubdomainFullUrl(tool.subdomainUrl);
};

const Tools = () => {
  const toolsQuery = useTools({ pageSize: 100 });
  const connectMutation = useConnectTool();

  const tools = toolsQuery.data?.items ?? [];
  const userTools = useMemo(
    () =>
      tools.filter(
        (tool) =>
          tool.connected ||
          (tool.owned && tool.pricingModel !== "free" && !tool.includedInPlan)
      ),
    [tools]
  );


  const handleConnect = async (tool: ToolCatalogItem) => {
    try {
      await connectMutation.mutateAsync({ toolId: tool.id });
    } catch (error) {
      toast.error("Failed to connect tool.");
    }
  };

  const renderAction = (tool: ToolCatalogItem) => {
    if (tool.connected) {
      const destination = resolveToolUrl(tool);
      if (destination) {
        return (
          <Button size="sm" onClick={() => window.open(destination, "_blank")}>
            Open Tool
          </Button>
        );
      }
      return <Badge variant="default">Connected</Badge>;
    }

    return (
      <Button
        size="sm"
        onClick={() => handleConnect(tool)}
        disabled={connectMutation.isPending}
      >
        {connectMutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Connect
      </Button>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tools</h1>
          <p className="text-muted-foreground">
            Access tools you have connected or purchased.
          </p>
        </div>
        <Link to="/dashboard/browse-tools">
          <Button variant="outline">Browse tools</Button>
        </Link>
      </div>

      {toolsQuery.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={`tool-skeleton-${index}`}>
              <CardHeader>
                <Skeleton height={20} width="70%" />
                <Skeleton height={14} width="40%" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton height={14} width="100%" />
                <Skeleton height={14} width="90%" />
                <div className="flex gap-2">
                  <Skeleton height={24} width={90} />
                  <Skeleton height={24} width={90} />
                </div>
                <Skeleton height={36} width={120} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : userTools.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            You have not connected any tools yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userTools.map((tool) => (
            <Card key={tool.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <CardDescription>{tool.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 flex-1">
                <p className="text-sm text-muted-foreground">
                  {tool.description ?? "No description available."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.pricingModel ? (
                    <Badge variant="outline">{tool.pricingModel}</Badge>
                  ) : null}
                  {tool.toolType ? (
                    <Badge variant="secondary">{tool.toolType}</Badge>
                  ) : null}
                  {tool.owned && !tool.connected ? (
                    <Badge variant="default">Owned</Badge>
                  ) : null}
                </div>
                <div className="mt-auto">{renderAction(tool)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tools;
