import { CheckCircle2, Zap, Workflow } from "lucide-react";

const steps = [
  {
    icon: CheckCircle2,
    step: "Step 1",
    title: "Choose Your Department",
    description:
      "Select a bundle matching your department: Marketing, Operations, Consultancy, or Technology.",
  },
  {
    icon: Zap,
    step: "Step 2",
    title: "One-Click Activation",
    description:
      "Instantly connect all tools with one click - no setup or API keys needed.",
  },
  {
    icon: Workflow,
    step: "Step 3",
    title: "Automate processes",
    description:
      "Use ready-made templates or build custom workflows with your bundle's integrated tools.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="pt-16"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            From Bundle to Business in 3 Steps
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            No technical expertise needed. No weeks of setup. Just instant
            automation.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  {/* Connector Line (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[60%] top-12 hidden h-px w-[80%] bg-gradient-to-r from-accent to-transparent md:block" />
                  )}

                  {/* Icon */}
                  <div className="mx-auto mb-6 flex h-12 md:h-24 w-12 md:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-lg">
                    <Icon className="h-4 w-4 md:h-12 md:w-12 text-white" />
                  </div>

                  {/* Step Label */}
                  <div className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">
                    {step.step}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-sm md:text-xl font-bold text-foreground">
                    {step.title}
                  </h3>

                  {/* Description */}
                  {/* <p className="text-muted-foreground">{step.description}</p> */}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Average activation time:{" "}
            <span className="text-accent">Under 60 seconds</span>
          </p>
        </div>
      </div>
    </section>
  );
};
