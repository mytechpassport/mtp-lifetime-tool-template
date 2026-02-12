import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Zap,
  Bug,
  CheckCircle2,
  Rocket,
  RefreshCw,
} from "lucide-react";

type ChangeType = "feature" | "improvement" | "fix";

interface ChangeLogItem {
  type: ChangeType;
  content: string;
}

interface ChangeLogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: ChangeLogItem[];
}

const mockChangelogs: ChangeLogEntry[] = [
  {
    version: "v1.1.0",
    date: "January 15, 2026",
    title: "Enhanced Workflow Automation",
    description:
      "We've supercharged the workflow engine with new triggers and improved performance for high-volume tasks.",
    changes: [
      {
        type: "feature",
        content: "Added new 'Webhook' trigger to AgentflowV2.",
      },
      {
        type: "feature",
        content:
          "Introduced advanced error handling settings for individual workflow steps.",
      },
      {
        type: "improvement",
        content: "Workflow execution speed increased by 30%.",
      },
      {
        type: "fix",
        content:
          "Fixed an issue where large payloads caused timeouts in the 'HTTP Request' node.",
      },
    ],
  },
  {
    version: "v1.0.0",
    date: "January 1, 2026",
    title: "Initial Launch",
    description:
      "Welcome to MyTechPassport! The complete platform for automating your business tools.",
    changes: [
      {
        type: "feature",
        content: "Launched User Dashboard with workflow management.",
      },
      {
        type: "feature",
        content:
          "Released Vendor Dashboard for software submission and analytics.",
      },
      { type: "feature", content: "Integrated affiliate program tracking." },
      {
        type: "improvement",
        content: "Optimized mobile responsiveness for all dashboard pages.",
      },
    ],
  },
];

// const mockChangelogs: ChangeLogEntry[] = [];

const ChangeLog = () => {
  const data = mockChangelogs;

  return (
    <div className="min-h-screen py-12 md:py-20 relative animate-fade-in">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-purple-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            Updates
          </Badge>
          <h1 className="mb-8 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Changelog
          </h1>
          <p className="text-lg text-muted-foreground maxWidth-2xl mx-auto">
            Stay up to date with the latest features, improvements, and bug
            fixes.
          </p>
        </div>

        {/* Content */}
        <div className="relative">
          {data.length > 0 ? (
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[8.5rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">
              {data.map((entry, index) => (
                <div
                  key={entry.version}
                  className="relative flex flex-col md:flex-row gap-8 md:gap-12 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-5 md:left-[8.5rem] top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-sm z-10 group-hover:scale-110 transition-transform duration-300" />

                  {/* Date & Version (Left Sidebar on Desktop) */}
                  <div className="md:w-32 flex-shrink-0 flex md:flex-col items-center md:items-end md:text-right gap-3 md:gap-1 mt-1">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.date}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs border-primary/20 text-primary"
                    >
                      {entry.version}
                    </Badge>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                    <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      {entry.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {entry.description}
                    </p>

                    <div className="space-y-4">
                      {/* Features */}
                      {entry.changes.filter((c) => c.type === "feature")
                        .length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/90">
                            <span className="p-1 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                              <Rocket className="w-4 h-4" />
                            </span>
                            New Features
                          </h4>
                          <ul className="space-y-2 ml-1">
                            {entry.changes
                              .filter((c) => c.type === "feature")
                              .map((change, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground flex items-start gap-2.5"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{change.content}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Improvements */}
                      {entry.changes.filter((c) => c.type === "improvement")
                        .length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/90">
                            <span className="p-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                              <Zap className="w-4 h-4" />
                            </span>
                            Improvements
                          </h4>
                          <ul className="space-y-2 ml-1">
                            {entry.changes
                              .filter((c) => c.type === "improvement")
                              .map((change, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground flex items-start gap-2.5"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 ml-1 flex-shrink-0" />
                                  <span>{change.content}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Fixes */}
                      {entry.changes.filter((c) => c.type === "fix").length >
                        0 && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/90">
                            <span className="p-1 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                              <Bug className="w-4 h-4" />
                            </span>
                            Bug Fixes
                          </h4>
                          <ul className="space-y-2 ml-1">
                            {entry.changes
                              .filter((c) => c.type === "fix")
                              .map((change, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground flex items-start gap-2.5"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 ml-1 flex-shrink-0" />
                                  <span>{change.content}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative bg-card p-6 rounded-full border shadow-sm">
                  <RefreshCw className="w-10 h-10 text-primary " />
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-2xl font-bold">No Updates Yet</h3>
                <p className="text-muted-foreground">
                  We're just getting started! Check back soon for the latest
                  features and improvements to the platform.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeLog;
