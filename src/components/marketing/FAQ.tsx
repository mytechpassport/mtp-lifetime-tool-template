import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What exactly is a bundle?",
    answer:
      "A bundle is a thoughtfully curated set of tools that work together for a specific department or business function. All tools in a bundle are pre-connected, so you can start creating workflows immediately without any setup or integration work.",
  },
  {
    question: "How is this different from buying tools separately?",
    answer:
      "When you buy tools separately, you have to spend hours (or weeks) connecting them, managing multiple subscriptions, and troubleshooting integration issues. With MyTechPassport bundles, everything is connected from day one. You save time, money, and frustration.",
  },
  {
    question: "What's the difference between a bundle and a workflow?",
    answer:
      "A workflow is a single automation blueprint that connects your tools to execute a specific task—like automatically emailing a new client—whereas a bundle is a curated collection of multiple workflows designed to equip an entire department, such as a 'Marketing' bundle. Think of your tools as LEGO bricks: if a workflow is the instruction sheet for building one specific model, a bundle is the complete box set containing the instructions for every model you need to build for that role.",
  },
  {
    question: "Can I switch bundles later?",
    answer:
      "Absolutely! You can swap tools or bundles anytime without downtime. Your data stays safe, and workflows adapt automatically to the new tools.",
  },
  {
    question: "Do I really get 2 workflows for free?",
    answer:
      "Yes! When you sign up, choose your department and you'll get 2 pre-connected workflows for life. No credit card required, no time limits, no catches.",
  },
  {
    question: "What if I already have my own tools?",
    answer:
      "That's fine! You can connect third-party tools to your workflows (paid users can add them free, free users pay per tool). Or, you can explore our lifetime software deals and find better alternatives at one-time prices.",
  },
  {
    question: "How long does activation really take?",
    answer:
      "Most bundles activate in under 60 seconds. Just click 'Activate Bundle' and all tools connect automatically. No API keys, no setup wizards, no technical knowledge needed.",
  },
  {
    question: "What are lifetime software deals?",
    answer:
      "These are individual tools you can buy once and own forever, instead of paying monthly subscriptions. Every lifetime tool integrates with your bundles automatically, so you can use them in your workflows.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to know about bundles, workflows, and how
            MyTechPassport works.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="font-semibold text-accent hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
