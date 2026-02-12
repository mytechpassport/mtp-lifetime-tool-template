import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    name: "AutomateIntel",
    description: "AI-powered automation for chat, email etc.",
    price: "$79",
    yearlyValue: "$790/year",
    category: "Automation",
  },
  {
    name: "StackEasy",
    description: "Unified subscription intelligence dashboard",
    price: "$59",
    yearlyValue: "$590/year",
    category: "Analytics",
  },
  {
    name: "DataFlow",
    description: "Seamless data migration and synchronization",
    price: "$89",
    yearlyValue: "$890/year",
    category: "Integration",
  },
  {
    name: "TaskMaster",
    description: "AI-powered project management",
    price: "$69",
    yearlyValue: "$690/year",
    category: "Productivity",
  },
  {
    name: "InsightAI",
    description: "AI-driven analytics and reporting",
    price: "$99",
    yearlyValue: "$990/year",
    category: "Analytics",
  },
  {
    name: "EmailFlow",
    description: "Hyper-personalized email marketing",
    price: "$79",
    yearlyValue: "$790/year",
    category: "Marketing",
  },
];

export const LifetimeSoftware = () => {
  return (
    <section id="lifetime-software" className="pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
            Discover More
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Plus: Lifetime Software Deals
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every bundle includes curated tools, but you can also add individual
            lifetime software at unbeatable prices. Pay once, own forever, and
            connect them to any workflow.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 3).map((tool, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-4 transition-all hover:shadow-lg"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <Badge variant="secondary" className="text-xs">
                  {tool.category}
                </Badge>
              </div>

              {/* Tool Info */}
              <h3 className="mb-1.5 text-xl font-bold text-foreground">
                {tool.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {tool.description}
              </p>

              {/* Pricing */}
              <div className="mb-1.5 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {tool.price}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {tool.yearlyValue}
                </span>
              </div>
              <p className="mb-4 text-xs font-medium text-accent">
                Lifetime license • One-time payment
              </p>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full transition-colors group-hover:border-accent group-hover:bg-accent/5 group-hover:text-accent"
              >
                Get Lifetime Access
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            Browse All Lifetime Software
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            All lifetime software integrates with your bundles automatically
          </p>
        </div>
      </div>
    </section>
  );
};
