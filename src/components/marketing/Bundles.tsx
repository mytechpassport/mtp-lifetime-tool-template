import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Briefcase, Code, LineChart, Users } from "lucide-react";

const bundles = [
  {
    icon: LineChart,
    department: "Marketing",
    title: "Marketing Automation Bundle",
    description:
      "Launch-ready funnel with CRM, email marketing, landing pages, and analytics—all sharing data instantly.",
    tools: ["CRM", "Email Platform", "Landing Pages", "Analytics"],
    workflows: "12 pre-connected workflows",
    savings: "Save $200/month vs. separate tools",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Briefcase,
    department: "Operations",
    title: "Operations Excellence Bundle",
    description:
      "Project management, time tracking, invoicing, and client portals working together seamlessly.",
    tools: ["Project Manager", "Time Tracker", "Invoicing", "Client Portal"],
    workflows: "10 pre-connected workflows",
    savings: "Save $180/month vs. separate tools",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    department: "Consultancy",
    title: "Consultancy Professional Bundle",
    description:
      "Client onboarding, proposal generation, meeting scheduler, and billing integrated perfectly.",
    tools: ["Proposals", "Scheduler", "Contracts", "Payments"],
    workflows: "8 pre-connected workflows",
    savings: "Save $150/month vs. separate tools",
    color: "from-green-500 to-emerald-500",
  },
  // {
  //   icon: Code,
  //   department: "Technology",
  //   title: "Developer Productivity Bundle",
  //   description:
  //     "Code collaboration, deployment automation, monitoring, and documentation all connected.",
  //   tools: ["Git Manager", "CI/CD", "Monitoring", "Docs"],
  //   workflows: "15 pre-connected workflows",
  //   savings: "Save $250/month vs. separate tools",
  //   color: "from-orange-500 to-red-500",
  // },
];

export const Bundles = () => {
  return (
    <section id="bundles" className="pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Choose Your Bundle
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Each bundle is a complete business system with tools that work
            together from day one. Pick your department and start automating
            immediately.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">
          {bundles.map((bundle, index) => {
            const Icon = bundle.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 p-8 transition-all hover:border-accent hover:shadow-xl"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${bundle.color} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
                />

                <div className="relative">
                  {/* Icon & Department */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${bundle.color}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {bundle.department}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mb-3 text-2xl font-bold text-foreground">
                    {bundle.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {bundle.description}
                  </p>

                  {/* Tools List */}
                  <div className="mb-6">
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      Included Tools:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bundle.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6 space-y-2 border-t border-border pt-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-accent">
                        {bundle.workflows}
                      </span>
                      <span className="text-muted-foreground">
                        ready to activate
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {bundle.savings}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="group/btn w-full gap-2 bg-gradient-to-r from-accent to-accent/90 transition-all hover:from-accent/90 hover:to-accent/80"
                    onClick={() => (window.location.href = "/auth")}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            Get access to{" "}
            <span className="font-bold text-foreground">
              ALL workflow bundles for $99/month
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Start with 2 free workflows on our free plan
          </p>
        </div>
      </div>
    </section>
  );
};
