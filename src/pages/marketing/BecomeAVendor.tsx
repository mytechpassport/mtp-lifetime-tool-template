import { Link } from "react-router-dom";
import {
  ArrowRight,
  DollarSign,
  Users,
  Globe,
  BarChart2,
  Package,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageSeo } from "@/components/seo/PageSeo";

const benefits = [
  {
    icon: Globe,
    title: "Instant Market Access",
    description:
      "List your software tool and get immediate exposure to My Tech Passport's growing user base of business owners actively looking for automation tools.",
  },
  {
    icon: DollarSign,
    title: "Recurring Revenue",
    description:
      "My Tech Passport users pay for subscriptions and lifetime access to tools. You earn every time a user purchases or accesses your software.",
  },
  {
    icon: Zap,
    title: "Workflow Integration",
    description:
      "When your tool is listed on My Tech Passport, users can connect it to their workflows. This creates deep product stickiness and keeps users engaged.",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description:
      "Track how many users have connected your tool, how often it is being used in workflows, and manage your payouts from a dedicated vendor dashboard.",
  },
  {
    icon: Package,
    title: "Lifetime Deal Listings",
    description:
      "Offer your software as a lifetime deal on My Tech Passport. Users pay once; you get a lump-sum payment. A great way to grow your user base fast.",
  },
  {
    icon: Users,
    title: "Dedicated Vendor Support",
    description:
      "Get access to a dedicated vendor success team who will help you onboard, list your tool correctly, and optimise your listing for maximum conversions.",
  },
];

const steps = [
  {
    step: "1",
    title: "Sign Up as a Vendor",
    description:
      "Create your vendor account on My Tech Passport. It takes under five minutes.",
  },
  {
    step: "2",
    title: "Submit Your Tool",
    description:
      "Add your software details, pricing, and integration information through the vendor dashboard.",
  },
  {
    step: "3",
    title: "Go Live and Earn",
    description:
      "Once approved, your tool is live on the My Tech Passport marketplace and accessible to thousands of users.",
  },
];

const BecomeAVendor = () => {
  return (
    <div className="font-sans text-base text-foreground">
      <PageSeo
        title="Become a Vendor - List Your Software on My Tech Passport"
        description="Join the MyTechPassport vendor marketplace. List your software tool, reach thousands of businesses, earn recurring revenue, and integrate into pre-built automation workflows."
        canonical="/become-a-vendor"
        keywords="software vendor marketplace, list software tool, SaaS marketplace, sell software online, vendor programme"
      />
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-14 md:pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-6">
          <Star className="h-4 w-4" />
          Vendor Programme
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          List Your Software on My Tech Passport
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Join our growing marketplace and put your software in front of
          thousands of businesses that are actively looking for tools to connect
          and automate their workflows.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/vendor/auth/signup">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80"
            >
              Apply as a Vendor
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="mailto:support@mytechpassport.com?subject=Vendor%20Programme%20Enquiry&body=Hi%20My%20Tech%20Passport%20Team%2C%0A%0AI%20am%20interested%20in%20listing%20my%20software%20as%20a%20vendor.%20Here%20are%20some%20details%3A%0A%0ASoftware%20Name%3A%20%0AWebsite%3A%20%0ADescription%3A%20">
            <Button size="lg" variant="outline">
              Contact Us First
            </Button>
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-muted/30 border-y border-border py-8">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              1,000+
            </div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              Growing
            </div>
            <div className="text-sm text-muted-foreground">Marketplace</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              0%
            </div>
            <div className="text-sm text-muted-foreground">Setup Cost</div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-center">
          Why List on My Tech Passport?
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Everything you need to grow your software business through our
          platform.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:border-accent transition-colors border-2"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-muted/20 border-y border-border py-14">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 tracking-tight text-center">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Getting listed takes less than a day.
          </p>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                  {step.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 tracking-tight">
          Vendor Requirements
        </h2>
        <ul className="space-y-3 mb-8">
          {[
            "Your software must be a working, production-ready product",
            "You must be the owner or an authorised representative of the software",
            "Your tool must not violate our Acceptable Use Policy",
            "You must be able to fulfil and support user purchases",
            "Integration documentation or an API must be available for workflow connection",
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle className="h-5 w-5 mt-0.5 text-accent shrink-0" />
              <span className="text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-muted/30 border-t border-border py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3 tracking-tight">
            Ready to Grow Your Software Business?
          </h2>
          <p className="text-muted-foreground mb-6">
            Apply now and get your tool in front of thousands of businesses
            looking for exactly what you offer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/vendor/auth/signup">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80"
              >
                Apply as a Vendor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="mailto:support@mytechpassport.com?subject=Vendor%20Programme%20Enquiry&body=Hi%20My%20Tech%20Passport%20Team%2C%0A%0AI%20am%20interested%20in%20listing%20my%20software%20as%20a%20vendor.%20Here%20are%20some%20details%3A%0A%0ASoftware%20Name%3A%20%0AWebsite%3A%20%0ADescription%3A%20">
              <Button size="lg" variant="outline">
                Have Questions? Email Us
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No setup fee. No listing fee. Only pay when you earn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BecomeAVendor;
