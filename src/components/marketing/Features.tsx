import { Zap } from "lucide-react";

// TODO: Replace with your tool's 6 features. Import relevant icons from lucide-react.
const features = [
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Feature One",
    description:
      "Describe this feature in 1-2 sentences. Focus on the benefit to the user, not the technical detail.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Feature Two",
    description:
      "Describe this feature in 1-2 sentences. Focus on the benefit to the user, not the technical detail.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Feature Three",
    description:
      "Describe this feature in 1-2 sentences. Focus on the benefit to the user, not the technical detail.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Feature Four",
    description:
      "Describe this feature in 1-2 sentences. Focus on the benefit to the user, not the technical detail.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Feature Five",
    description:
      "Describe this feature in 1-2 sentences. Focus on the benefit to the user, not the technical detail.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Feature Six",
    description:
      "Describe this feature in 1-2 sentences. Focus on the benefit to the user, not the technical detail.",
  },
];

export const Features = () => {
  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          {/* TODO: Replace heading and subtitle */}
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to get results
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            All the features you need, none of the complexity you don't.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-background p-5 hover:border-primary/30 transition-colors"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
