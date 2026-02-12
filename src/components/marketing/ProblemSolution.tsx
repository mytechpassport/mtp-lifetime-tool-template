import { CheckCircle2, XCircle } from "lucide-react";

export const ProblemSolution = () => {
  return (
    <section className="pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Why Most Software Sits Unused
            </h2>
            <p className="text-lg text-muted-foreground">
              You buy tools with great intentions, but connecting them becomes
              your full-time job.
            </p>
          </div>

          {/* Feature Comparison Table wrapped in an overflow container for responsiveness */}
          <div className="overflow-x-auto mb-10">
            <div className="min-w-[600px] bg-background rounded-xl overflow-hidden border border-border shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-3">
                <div className="col-span-1 p-5 bg-foreground text-background">
                  <h2 className="text-xl">
                    Thoughtfully curated workflows that work together instantly
                  </h2>

                  {/* <p className="text-sm mt-1 text-muted">
                    Thoughtfully curated workflows that work together instantly
                  </p> */}
                </div>
                <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <p className="text-xs mt-2 font-medium">
                      MyTechPassport Way
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-10 w-10 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                      <XCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <p className="text-xs mt-2 font-medium">The Old Way</p>
                  </div>
                </div>
              </div>

              {/* Table Features */}
              {/* max-h-[600px] */}
              <div className="">
                {/* Bundle with all tools included */}
                <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 bg-muted/50 flex items-center">
                    <span className="font-medium">
                      Bundle with all tools included
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pre-connected tools */}
                <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 flex items-center">
                    <span className="font-medium">
                      Tools are pre-integrated and share data seamlessly
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* One-click activation */}
                <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 bg-muted/50 flex items-center">
                    <span className="font-medium">
                      One-click activation - start automating in minutes
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Automatic data flow */}
                <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 flex items-center">
                    <span className="font-medium">
                      Data flows automatically between all your tools
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus on growth */}
                <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 bg-muted/50 flex items-center">
                    <span className="font-medium">
                      Focus on growth while automation handles the rest
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opposite scenarios for "The Old Way" */}
                {/* Buy 5 different tools at "great prices" */}
                {/* <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 flex items-center">
                    <span className="font-medium">
                      Buy 5 different tools at "great prices"
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Each tool sits alone */}
                {/* <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 bg-muted/50 flex items-center">
                    <span className="font-medium">
                      Each tool sits alone in its own dashboard
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Spend weeks learning API integrations */}
                <div className="grid grid-cols-3 border-b border-border">
                  <div className="col-span-1 p-5 flex items-center">
                    <span className="font-medium">
                      Spend weeks learning API integrations
                    </span>
                  </div>
                  <div className="col-span-2 p-5 grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Footer */}
              <div className="p-5 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Stop wasting time on integration. Start with bundles that just
                  work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
