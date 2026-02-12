export const TrustedBySection = () => {
  const companies = [
    "TechStart Inc.",
    "Digital Agency Co",
    "Growth Labs",
    "Innovation Hub",
    "CloudScale",
    "Future Systems",
  ];

  // Duplicate companies array to create seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="border-y border-border bg-card py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
          TRUSTED BY LEADING BUSINESSES AND AGENCIES
        </p>
        <div className="relative">
          <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company}-${index}`}
                className="mx-8 text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
