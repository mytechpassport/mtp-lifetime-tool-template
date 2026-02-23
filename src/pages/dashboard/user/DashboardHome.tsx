import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, BookOpen } from "lucide-react";

/**
 * Dashboard home — placeholder for your MTP tool.
 * Replace this page with your tool’s main UI.
 * See: MTP_ORIGINAL_TOOLS_GUIDE_AND_IMPLEMENTATION_PLAN.md for access, APIs, and tool structure.
 */
const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <ToolAccessGate slug={MY_TOOL_SLUG}>
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome{user?.name ? `, ${user.name}` : ""}</h2>
        <p className="text-muted-foreground">
          This is your MTP tool dashboard. Build your tool UI here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Your tool
            </CardTitle>
            <CardDescription>
              Add your tool’s main feature (e.g. editor, generator, dashboard). Use the same backend (backend_simple), cookie auth, and tool APIs as described in the MTP Tools Guide.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              MTP Tools Guide
            </CardTitle>
            <CardDescription>
              For slug-based routes, by-slug API <code className="text-xs bg-muted px-1 rounded">/api/custom/mtp/tools/v1/by-slug/:slug</code>, tool access (purchase/subscription), and per-tool APIs under <code className="text-xs bg-muted px-1 rounded">/api/custom/mtp/tools/v1/&lt;tool-folder&gt;/</code>, see the MTP Original Tools Guide and Implementation Plan.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
    </ToolAccessGate>
  );
};

export default DashboardHome;
