import { Settings2, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: <Settings2 className="h-6 w-6 text-primary" />,
    title: "Setup",
    description: "Configure your options.",
  },
  {
    step: "2",
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Run",
    description: "Process your data efficiently.",
  },
  {
    step: "3",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Results",
    description: "Get instant outputs.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/20" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to automate your tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-border" />
              )}
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                {step.icon}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
