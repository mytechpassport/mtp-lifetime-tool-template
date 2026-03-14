import { Zap } from "lucide-react";

// TODO: Replace icons and content with steps specific to your tool
const steps = [
  {
    icon: Zap,
    step: "Step 1",
    title: "Step one title",
    description:
      "Describe what the user does in step one. Keep it short and action-oriented.",
  },
  {
    icon: Zap,
    step: "Step 2",
    title: "Step two title",
    description:
      "Describe what happens in step two. Focus on the tool doing the work.",
  },
  {
    icon: Zap,
    step: "Step 3",
    title: "Step three title",
    description:
      "Describe the result or outcome. What does the user have at the end?",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/20" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          {/* TODO: Replace heading and subtitle */}
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get results in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
