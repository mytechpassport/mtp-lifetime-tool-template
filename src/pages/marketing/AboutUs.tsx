import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Zap,
  Users,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSeo } from "@/components/seo/PageSeo";

const values = [
  {
    icon: Target,
    title: "Built for Real Business",
    description:
      "Every feature on My Tech Passport is built around one question: does this help a real business run better? We prioritise utility over novelty.",
  },
  {
    icon: Zap,
    title: "Speed Without Complexity",
    description:
      "Automation should be fast to set up, not just fast to run. We obsess over reducing the time from sign-up to first running workflow.",
  },
  {
    icon: Users,
    title: "Accessible to Everyone",
    description:
      "You should not need a development team to automate your business. My Tech Passport is built for business owners, not engineers.",
  },
  {
    icon: Globe,
    title: "Connected by Design",
    description:
      "Tools are only useful when they talk to each other. Connectivity is not an afterthought at My Tech Passport. It is the foundation.",
  },
];

const AboutUs = () => {
  return (
    <div className="font-sans text-base text-foreground">
      <PageSeo
        title="About My Tech Passport"
        description="My Tech Passport is a business automation platform built to help small and medium businesses connect their tools and run automated workflows without needing a technical team."
        canonical="/about"
        keywords="about MyTechPassport, business automation platform, workflow automation company"
      />
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-14 md:pt-20 pb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          About My Tech Passport
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          My Tech Passport is a business automation platform built to help small
          and medium businesses connect their tools and run automated workflows
          without needing a technical team.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-muted/30 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
            Our mission is simple: help every business spend less time on
            repetitive manual work, and more time on the things that actually
            create value.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Our Story</h2>
        <p className="mb-5 text-foreground/90 leading-relaxed">
          My Tech Passport was founded after watching too many capable
          businesses waste hours every week on tasks that software should
          handle. The problem was not that automation tools did not exist. The
          problem was that most of them required technical expertise to set up
          and maintain.
        </p>
        <p className="mb-5 text-foreground/90 leading-relaxed">
          The average small business uses over a dozen different software tools.
          Getting those tools to work together typically means hiring a
          developer, building custom integrations, or paying for expensive
          middleware platforms that are built for enterprise teams.
        </p>
        <p className="mb-5 text-foreground/90 leading-relaxed">
          My Tech Passport was built to change that. We give businesses a single
          platform where they can connect their tools, activate pre-built
          workflows, and start automating immediately. No developers, no API
          keys, no complex setup.
        </p>
        <p className="mb-5 text-foreground/90 leading-relaxed">
          Beyond workflow automation, we also offer a growing library of
          built-in tools that any business can use: SEO audit tools, invoice
          generators, AI transcription, whiteboards and more. Many of these are
          available on a one-time lifetime purchase, so you own them forever.
        </p>
      </div>

      {/* Values */}
      <div className="bg-muted/20 border-y border-border py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 tracking-tight text-center">
            What We Stand For
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 tracking-tight">
          What My Tech Passport Offers
        </h2>
        <ul className="space-y-3 mb-8">
          {[
            "Workflow automation platform with pre-built and custom workflow support",
            "A library of built-in tools covering marketing, productivity, finance and more",
            "Third-party tool connections with one-click activation",
            "Lifetime software deals: pay once, own forever",
            "Vendor marketplace: software vendors can list their tools and reach My Tech Passport users",
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle className="h-5 w-5 mt-0.5 text-accent shrink-0" />
              <span className="text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-6">
            Have a question or want to learn more? We would love to hear from
            you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@mytechpassport.com?subject=Hello%20from%20the%20Website&body=Hi%20My%20Tech%20Passport%20Team%2C%0A%0A"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Email Us
            </a>
            <Link to="/auth" className="inline-flex">
              <Button variant="outline" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
