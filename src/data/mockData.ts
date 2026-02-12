/**
 * Optional reference / mock data for the template.
 * Not used by the minimal template; keep or remove as needed for your tool.
 */
export interface WorkflowStep {
  id: string;
  name: string;
  toolCategory: string; // e.g., "Form", "CRM", "Email"
  defaultTool: string; // default tool ID
  alternativeTools: string[]; // array of alternative tool IDs
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  icon: string;
  status: "active" | "inactive";
  usageCount?: number;
  connected?: boolean;
  isThirdParty?: boolean;
  steps?: WorkflowStep[]; // workflow steps with tools
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  isThirdParty: boolean;
  connected?: boolean;
  integrations?: string[];
  features?: string[];
  url?: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  workflows: Workflow[];
  popular?: boolean;
  acquired?: boolean;
}

export interface MTPSoftware {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  lifetimePrice: number;
  features: string[];
  popular?: boolean;
  url?: string;
}

export const departmentWorkflows: Record<string, Workflow[]> = {
  "Solo Business": [
    {
      id: "solo-1",
      name: "Client Onboarding",
      description: "Automate client welcome emails and document collection",
      category: "Onboarding",
      department: "Solo Business",
      icon: "UserPlus",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Form Submission",
          toolCategory: "Forms",
          defaultTool: "google-forms",
          alternativeTools: ["typeform", "mtp-7"], // FormBuilder MTP
        },
        {
          id: "step-2",
          name: "Add to CRM",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
        {
          id: "step-3",
          name: "Send Welcome Email",
          toolCategory: "Email",
          defaultTool: "gmail",
          alternativeTools: ["outlook", "mailchimp"],
        },
      ],
    },
    {
      id: "solo-2",
      name: "Invoice Automation",
      description: "Generate and send invoices automatically",
      category: "Finance",
      department: "Solo Business",
      icon: "Receipt",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Project Completion Trigger",
          toolCategory: "Project Management",
          defaultTool: "trello",
          alternativeTools: ["asana", "mtp-1"], // ProjectFlow Pro MTP
        },
        {
          id: "step-2",
          name: "Generate Invoice",
          toolCategory: "Invoicing",
          defaultTool: "mtp-4", // InvoiceMaster MTP
          alternativeTools: ["quickbooks", "freshbooks"],
        },
        {
          id: "step-3",
          name: "Send Invoice Email",
          toolCategory: "Email",
          defaultTool: "gmail",
          alternativeTools: ["outlook", "mailchimp"],
        },
      ],
    },
    {
      id: "solo-3",
      name: "Social Media Posting",
      description: "Schedule and auto-post content across platforms",
      category: "Marketing",
      department: "Solo Business",
      icon: "Share2",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Content Creation",
          toolCategory: "Content",
          defaultTool: "canva",
          alternativeTools: ["figma", "adobe-creative"],
        },
        {
          id: "step-2",
          name: "Schedule Posts",
          toolCategory: "Social Media",
          defaultTool: "buffer",
          alternativeTools: ["hootsuite", "later"],
        },
        {
          id: "step-3",
          name: "Track Analytics",
          toolCategory: "Analytics",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-analytics", "sprout-social"],
        },
      ],
    },
  ],
  Marketing: [
    {
      id: "mkt-1",
      name: "Social Media Scheduler",
      description: "Auto-post content across all platforms",
      category: "Social",
      department: "Marketing",
      icon: "Share2",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Content Queue",
          toolCategory: "Content Management",
          defaultTool: "airtable",
          alternativeTools: ["notion", "google-sheets"],
        },
        {
          id: "step-2",
          name: "Schedule Posts",
          toolCategory: "Social Media",
          defaultTool: "buffer",
          alternativeTools: ["hootsuite", "later"],
        },
        {
          id: "step-3",
          name: "Performance Tracking",
          toolCategory: "Analytics",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-analytics", "sprout-social"],
        },
      ],
    },
    {
      id: "mkt-2",
      name: "Lead Scoring",
      description: "Automatically score and route leads",
      category: "Leads",
      department: "Marketing",
      icon: "Target",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Lead Capture",
          toolCategory: "Forms",
          defaultTool: "typeform",
          alternativeTools: ["google-forms", "hubspot"],
        },
        {
          id: "step-2",
          name: "Score Calculation",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
        {
          id: "step-3",
          name: "Route to Sales",
          toolCategory: "Communication",
          defaultTool: "slack",
          alternativeTools: ["mtp-3", "microsoft-teams"], // TeamSync MTP
        },
      ],
    },
    {
      id: "mkt-3",
      name: "Email Campaign Automation",
      description: "Create and send targeted email campaigns",
      category: "Email",
      department: "Marketing",
      icon: "Mail",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Audience Segmentation",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["mtp-5", "salesforce"], // CustomerHub MTP
        },
        {
          id: "step-2",
          name: "Email Design",
          toolCategory: "Email Marketing",
          defaultTool: "mailchimp",
          alternativeTools: ["constant-contact", "sendinblue"],
        },
        {
          id: "step-3",
          name: "Campaign Analytics",
          toolCategory: "Analytics",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-analytics", "mixpanel"],
        },
      ],
    },
    {
      id: "mkt-4",
      name: "Content Calendar",
      description: "Plan and schedule content across channels",
      category: "Planning",
      department: "Marketing",
      icon: "Calendar",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Content Planning",
          toolCategory: "Planning",
          defaultTool: "notion",
          alternativeTools: ["airtable", "trello"],
        },
        {
          id: "step-2",
          name: "Content Creation",
          toolCategory: "Design",
          defaultTool: "canva",
          alternativeTools: ["figma", "adobe-creative"],
        },
        {
          id: "step-3",
          name: "Multi-Channel Publishing",
          toolCategory: "Social Media",
          defaultTool: "buffer",
          alternativeTools: ["hootsuite", "later"],
        },
      ],
    },
  ],
  "Customer Support": [
    {
      id: "cs-1",
      name: "Ticket Management",
      description: "Auto-route and prioritize support tickets",
      category: "Support",
      department: "Customer Support",
      icon: "Headphones",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Ticket Creation",
          toolCategory: "Support",
          defaultTool: "zendesk",
          alternativeTools: ["freshdesk", "intercom"],
        },
        {
          id: "step-2",
          name: "Auto-Categorization",
          toolCategory: "AI/ML",
          defaultTool: "openai",
          alternativeTools: ["google-ai", "aws-comprehend"],
        },
        {
          id: "step-3",
          name: "Team Notification",
          toolCategory: "Communication",
          defaultTool: "slack",
          alternativeTools: ["mtp-3", "microsoft-teams"], // TeamSync MTP
        },
      ],
    },
    {
      id: "cs-2",
      name: "Auto-Response System",
      description: "Instant responses to common queries",
      category: "Automation",
      department: "Customer Support",
      icon: "MessageSquare",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Query Analysis",
          toolCategory: "AI/ML",
          defaultTool: "openai",
          alternativeTools: ["google-ai", "dialogflow"],
        },
        {
          id: "step-2",
          name: "Knowledge Base Search",
          toolCategory: "Knowledge Base",
          defaultTool: "notion",
          alternativeTools: ["confluence", "helpscout"],
        },
        {
          id: "step-3",
          name: "Auto-Reply",
          toolCategory: "Support",
          defaultTool: "zendesk",
          alternativeTools: ["freshdesk", "intercom"],
        },
      ],
    },
    {
      id: "cs-3",
      name: "Feedback Collection",
      description: "Automated customer satisfaction surveys",
      category: "Feedback",
      department: "Customer Support",
      icon: "Star",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Ticket Resolution Trigger",
          toolCategory: "Support",
          defaultTool: "zendesk",
          alternativeTools: ["freshdesk", "intercom"],
        },
        {
          id: "step-2",
          name: "Survey Delivery",
          toolCategory: "Survey",
          defaultTool: "typeform",
          alternativeTools: ["google-forms", "surveymonkey"],
        },
        {
          id: "step-3",
          name: "Feedback Analysis",
          toolCategory: "Analytics",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-analytics", "mixpanel"],
        },
      ],
    },
  ],
  Sales: [
    {
      id: "sales-1",
      name: "Quote Generator",
      description: "Create professional quotes in seconds",
      category: "Documents",
      department: "Sales",
      icon: "FileText",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Lead Information",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
        {
          id: "step-2",
          name: "Quote Generation",
          toolCategory: "Document",
          defaultTool: "pandadoc",
          alternativeTools: ["docusign", "proposify"],
        },
        {
          id: "step-3",
          name: "Email Delivery",
          toolCategory: "Email",
          defaultTool: "gmail",
          alternativeTools: ["outlook", "mailchimp"],
        },
      ],
    },
    {
      id: "sales-2",
      name: "Follow-up Automation",
      description: "Never miss a follow-up with prospects",
      category: "Automation",
      department: "Sales",
      icon: "Bell",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Lead Activity Tracking",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
        {
          id: "step-2",
          name: "Schedule Follow-up",
          toolCategory: "Calendar",
          defaultTool: "calendly",
          alternativeTools: ["google-calendar", "outlook-calendar"],
        },
        {
          id: "step-3",
          name: "Automated Reminder",
          toolCategory: "Email",
          defaultTool: "gmail",
          alternativeTools: ["outlook", "mailchimp"],
        },
      ],
    },
    {
      id: "sales-3",
      name: "CRM Integration",
      description: "Sync leads and contacts automatically",
      category: "Integration",
      department: "Sales",
      icon: "Users",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Lead Capture",
          toolCategory: "Forms",
          defaultTool: "typeform",
          alternativeTools: ["google-forms", "hubspot"],
        },
        {
          id: "step-2",
          name: "Data Sync",
          toolCategory: "Integration",
          defaultTool: "zapier",
          alternativeTools: ["integromat", "microsoft-flow"],
        },
        {
          id: "step-3",
          name: "CRM Update",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
      ],
    },
    {
      id: "sales-4",
      name: "Pipeline Management",
      description: "Track deals and forecast revenue",
      category: "Management",
      department: "Sales",
      icon: "TrendingUp",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Deal Updates",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
        {
          id: "step-2",
          name: "Revenue Calculation",
          toolCategory: "Analytics",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-sheets", "excel"],
        },
        {
          id: "step-3",
          name: "Team Reporting",
          toolCategory: "Communication",
          defaultTool: "slack",
          alternativeTools: ["mtp-3", "microsoft-teams"], // TeamSync MTP
        },
      ],
    },
  ],
  Finance: [
    {
      id: "fin-1",
      name: "Invoice Processing",
      description: "Automate invoice creation and tracking",
      category: "Billing",
      department: "Finance",
      icon: "Receipt",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Sales Data Trigger",
          toolCategory: "CRM",
          defaultTool: "hubspot",
          alternativeTools: ["salesforce", "mtp-5"], // CustomerHub MTP
        },
        {
          id: "step-2",
          name: "Invoice Generation",
          toolCategory: "Invoicing",
          defaultTool: "mtp-4", // InvoiceMaster MTP
          alternativeTools: ["quickbooks", "freshbooks"],
        },
        {
          id: "step-3",
          name: "Payment Tracking",
          toolCategory: "Accounting",
          defaultTool: "quickbooks",
          alternativeTools: ["xero", "wave"],
        },
      ],
    },
    {
      id: "fin-2",
      name: "Expense Reporting",
      description: "Streamline expense submission and approval",
      category: "Reporting",
      department: "Finance",
      icon: "DollarSign",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Receipt Capture",
          toolCategory: "OCR",
          defaultTool: "expensify",
          alternativeTools: ["receipt-bank", "shoeboxed"],
        },
        {
          id: "step-2",
          name: "Approval Workflow",
          toolCategory: "Workflow",
          defaultTool: "zapier",
          alternativeTools: ["microsoft-flow", "integromat"],
        },
        {
          id: "step-3",
          name: "Accounting Integration",
          toolCategory: "Accounting",
          defaultTool: "quickbooks",
          alternativeTools: ["xero", "wave"],
        },
      ],
    },
    {
      id: "fin-3",
      name: "Budget Tracking",
      description: "Monitor spending against budgets in real-time",
      category: "Budgeting",
      department: "Finance",
      icon: "PieChart",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Expense Data Collection",
          toolCategory: "Accounting",
          defaultTool: "quickbooks",
          alternativeTools: ["xero", "wave"],
        },
        {
          id: "step-2",
          name: "Budget Analysis",
          toolCategory: "Analytics",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-sheets", "excel"],
        },
        {
          id: "step-3",
          name: "Alert Notifications",
          toolCategory: "Communication",
          defaultTool: "slack",
          alternativeTools: ["mtp-3", "microsoft-teams"], // TeamSync MTP
        },
      ],
    },
    {
      id: "fin-4",
      name: "Payment Processing",
      description: "Automate payment collection and reconciliation",
      category: "Payments",
      department: "Finance",
      icon: "CreditCard",
      status: "active",
      usageCount: 0,
      connected: false,
      steps: [
        {
          id: "step-1",
          name: "Payment Gateway",
          toolCategory: "Payments",
          defaultTool: "stripe",
          alternativeTools: ["paypal", "square"],
        },
        {
          id: "step-2",
          name: "Transaction Recording",
          toolCategory: "Accounting",
          defaultTool: "quickbooks",
          alternativeTools: ["xero", "wave"],
        },
        {
          id: "step-3",
          name: "Reconciliation Report",
          toolCategory: "Reporting",
          defaultTool: "mtp-6", // AnalyticsIQ MTP
          alternativeTools: ["google-sheets", "excel"],
        },
      ],
    },
  ],
};

// Third-party tools data
export const thirdPartyTools: Tool[] = [
  {
    id: "google-forms",
    name: "Google Forms",
    description: "Create custom forms and surveys",
    category: "Forms",
    logo: "📝",
    isThirdParty: true,
    connected: false,
    features: ["Custom forms", "Real-time responses", "Data analysis"],
    url: "https://forms.google.com",
  },
  {
    id: "typeform",
    name: "Typeform",
    description: "Beautiful interactive forms",
    category: "Forms",
    logo: "✨",
    isThirdParty: true,
    connected: false,
    features: ["Interactive forms", "Conditional logic", "Beautiful design"],
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Email service by Google",
    category: "Email",
    logo: "📧",
    isThirdParty: true,
    connected: false,
    features: ["Email sending", "SMTP access", "API integration"],
    url: "https://gmail.com",
  },
  {
    id: "outlook",
    name: "Outlook",
    description: "Email service by Microsoft",
    category: "Email",
    logo: "📨",
    isThirdParty: true,
    connected: false,
    features: ["Email sending", "Calendar integration", "API access"],
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect your apps and automate workflows",
    category: "Automation",
    logo: "⚡",
    isThirdParty: true,
    connected: false,
    integrations: ["Gmail", "Slack", "Trello", "Salesforce"],
    features: [
      "5000+ app integrations",
      "Multi-step workflows",
      "Conditional logic",
    ],
    url: "https://zapier.com",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Complete CRM and marketing platform",
    category: "CRM",
    logo: "🧡",
    isThirdParty: true,
    connected: false,
    integrations: ["Gmail", "Outlook", "Salesforce", "Mailchimp"],
    features: ["Contact management", "Email marketing", "Sales pipeline"],
    url: "https://hubspot.com",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "World's #1 CRM platform",
    category: "CRM",
    logo: "☁️",
    isThirdParty: true,
    connected: false,
    features: ["Sales cloud", "Contact management", "Analytics"],
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing and automation platform",
    category: "Email Marketing",
    logo: "🐵",
    isThirdParty: true,
    connected: false,
    integrations: ["Shopify", "WordPress", "Facebook", "Instagram"],
    features: ["Email campaigns", "Audience segmentation", "Analytics"],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and collaboration",
    category: "Communication",
    logo: "💬",
    isThirdParty: true,
    connected: false,
    integrations: ["Google Drive", "Trello", "Zoom", "GitHub"],
    features: [
      "Channels",
      "Direct messaging",
      "File sharing",
      "App integrations",
    ],
    url: "https://slack.com",
  },
  {
    id: "trello",
    name: "Trello",
    description: "Visual project management tool",
    category: "Project Management",
    logo: "📋",
    isThirdParty: true,
    connected: false,
    integrations: ["Slack", "Google Drive", "Dropbox", "GitHub"],
    features: ["Kanban boards", "Card management", "Team collaboration"],
    url: "https://trello.com",
  },
  // Additional tools for workflow steps
  {
    id: "canva",
    name: "Canva",
    description: "Graphic design platform",
    category: "Design",
    logo: "🎨",
    isThirdParty: true,
    connected: false,
    features: ["Templates", "Drag & drop editor", "Brand kit"],
  },
  {
    id: "figma",
    name: "Figma",
    description: "Collaborative design tool",
    category: "Design",
    logo: "🔧",
    isThirdParty: true,
    connected: false,
    features: ["Real-time collaboration", "Prototyping", "Design systems"],
  },
  {
    id: "buffer",
    name: "Buffer",
    description: "Social media management platform",
    category: "Social Media",
    logo: "📱",
    isThirdParty: true,
    connected: false,
    features: ["Post scheduling", "Analytics", "Team collaboration"],
  },
  {
    id: "hootsuite",
    name: "Hootsuite",
    description: "Social media management dashboard",
    category: "Social Media",
    logo: "🦉",
    isThirdParty: true,
    connected: false,
    features: ["Multi-platform posting", "Social listening", "Team management"],
  },
  {
    id: "asana",
    name: "Asana",
    description: "Team project management",
    category: "Project Management",
    logo: "🔺",
    isThirdParty: true,
    connected: false,
    features: ["Task management", "Timeline view", "Team collaboration"],
  },
  {
    id: "notion",
    name: "Notion",
    description: "All-in-one workspace",
    category: "Productivity",
    logo: "📄",
    isThirdParty: true,
    connected: false,
    features: ["Notes", "Databases", "Wiki", "Project management"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Accounting software for small business",
    category: "Accounting",
    logo: "💰",
    isThirdParty: true,
    connected: false,
    features: ["Invoicing", "Expense tracking", "Tax preparation"],
  },
  {
    id: "xero",
    name: "Xero",
    description: "Beautiful accounting software",
    category: "Accounting",
    logo: "💼",
    isThirdParty: true,
    connected: false,
    features: ["Bank reconciliation", "Invoicing", "Expense claims"],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Customer service software",
    category: "Support",
    logo: "🎧",
    isThirdParty: true,
    connected: false,
    features: ["Ticket management", "Knowledge base", "Live chat"],
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Customer messaging platform",
    category: "Support",
    logo: "💬",
    isThirdParty: true,
    connected: false,
    features: ["Live chat", "Help desk", "Product tours"],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Online payment processing",
    category: "Payments",
    logo: "💳",
    isThirdParty: true,
    connected: false,
    features: ["Online payments", "Subscriptions", "Marketplace"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Digital payment platform",
    category: "Payments",
    logo: "🏦",
    isThirdParty: true,
    connected: false,
    features: ["Online payments", "Money transfers", "Buyer protection"],
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "AI and machine learning platform",
    category: "AI/ML",
    logo: "🤖",
    isThirdParty: true,
    connected: false,
    features: ["GPT models", "Text analysis", "Content generation"],
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Scheduling automation platform",
    category: "Calendar",
    logo: "📅",
    isThirdParty: true,
    connected: false,
    features: [
      "Automated scheduling",
      "Calendar integration",
      "Meeting preferences",
    ],
  },
  {
    id: "pandadoc",
    name: "PandaDoc",
    description: "Document automation platform",
    category: "Documents",
    logo: "📄",
    isThirdParty: true,
    connected: false,
    features: ["Document creation", "E-signatures", "Contract management"],
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Cloud collaboration service",
    category: "Database",
    logo: "🗂️",
    isThirdParty: true,
    connected: false,
    features: ["Spreadsheet-database hybrid", "Collaboration", "Templates"],
  },
  {
    id: "later",
    name: "Later",
    description: "Visual social media scheduler",
    category: "Social Media",
    logo: "⏰",
    isThirdParty: true,
    connected: false,
    features: ["Visual content calendar", "Auto-posting", "Analytics"],
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Web analytics service",
    category: "Analytics",
    logo: "📊",
    isThirdParty: true,
    connected: false,
    features: ["Website analytics", "Audience insights", "Conversion tracking"],
  },
  {
    id: "sprout-social",
    name: "Sprout Social",
    description: "Social media management and analytics",
    category: "Social Media",
    logo: "🌱",
    isThirdParty: true,
    connected: false,
    features: ["Social listening", "Publishing", "Analytics"],
  },
  {
    id: "constant-contact",
    name: "Constant Contact",
    description: "Email marketing platform",
    category: "Email Marketing",
    logo: "📧",
    isThirdParty: true,
    connected: false,
    features: ["Email campaigns", "Contact management", "Event marketing"],
  },
  {
    id: "sendinblue",
    name: "Sendinblue",
    description: "Email marketing and SMS platform",
    category: "Email Marketing",
    logo: "💙",
    isThirdParty: true,
    connected: false,
    features: ["Email campaigns", "SMS marketing", "Marketing automation"],
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Team collaboration platform",
    category: "Communication",
    logo: "👥",
    isThirdParty: true,
    connected: false,
    features: ["Video meetings", "Chat", "File collaboration"],
  },
  {
    id: "freshdesk",
    name: "Freshdesk",
    description: "Customer support software",
    category: "Support",
    logo: "🆘",
    isThirdParty: true,
    connected: false,
    features: ["Ticket management", "Knowledge base", "Community forums"],
  },
  {
    id: "docusign",
    name: "DocuSign",
    description: "Electronic signature platform",
    category: "Documents",
    logo: "✍️",
    isThirdParty: true,
    connected: false,
    features: ["E-signatures", "Document workflow", "Contract lifecycle"],
  },
  {
    id: "proposify",
    name: "Proposify",
    description: "Proposal software",
    category: "Documents",
    logo: "📋",
    isThirdParty: true,
    connected: false,
    features: ["Proposal templates", "E-signatures", "Analytics"],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Time management and scheduling",
    category: "Calendar",
    logo: "📅",
    isThirdParty: true,
    connected: false,
    features: ["Event scheduling", "Reminders", "Integration"],
  },
  {
    id: "outlook-calendar",
    name: "Outlook Calendar",
    description: "Microsoft calendar service",
    category: "Calendar",
    logo: "📆",
    isThirdParty: true,
    connected: false,
    features: ["Meeting scheduling", "Reminders", "Office 365 integration"],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics platform",
    category: "Analytics",
    logo: "📈",
    isThirdParty: true,
    connected: false,
    features: ["Event tracking", "User analytics", "A/B testing"],
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Cloud-based spreadsheet",
    category: "Productivity",
    logo: "📊",
    isThirdParty: true,
    connected: false,
    features: ["Real-time collaboration", "Formulas", "Charts"],
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    description: "Spreadsheet application",
    category: "Productivity",
    logo: "📈",
    isThirdParty: true,
    connected: false,
    features: ["Advanced formulas", "Pivot tables", "Data analysis"],
  },
  {
    id: "integromat",
    name: "Integromat",
    description: "Automation platform",
    category: "Automation",
    logo: "🔗",
    isThirdParty: true,
    connected: false,
    features: ["Visual automation", "API connections", "Data transformation"],
  },
  {
    id: "microsoft-flow",
    name: "Microsoft Power Automate",
    description: "Workflow automation service",
    category: "Automation",
    logo: "⚡",
    isThirdParty: true,
    connected: false,
    features: [
      "Business process automation",
      "Office 365 integration",
      "Templates",
    ],
  },
  {
    id: "expensify",
    name: "Expensify",
    description: "Expense management software",
    category: "Finance",
    logo: "💳",
    isThirdParty: true,
    connected: false,
    features: ["Receipt scanning", "Expense reports", "Reimbursements"],
  },
  {
    id: "wave",
    name: "Wave",
    description: "Free accounting software",
    category: "Accounting",
    logo: "🌊",
    isThirdParty: true,
    connected: false,
    features: ["Free invoicing", "Accounting", "Receipt scanning"],
  },
  {
    id: "square",
    name: "Square",
    description: "Payment processing platform",
    category: "Payments",
    logo: "⬜",
    isThirdParty: true,
    connected: false,
    features: ["Point of sale", "Online payments", "Inventory management"],
  },
  {
    id: "adobe-creative",
    name: "Adobe Creative Suite",
    description: "Creative design software",
    category: "Design",
    logo: "🎨",
    isThirdParty: true,
    connected: false,
    features: ["Photoshop", "Illustrator", "InDesign"],
  },
  {
    id: "freshbooks",
    name: "FreshBooks",
    description: "Cloud accounting software",
    category: "Accounting",
    logo: "📚",
    isThirdParty: true,
    connected: false,
    features: ["Time tracking", "Invoicing", "Expense tracking"],
  },
  {
    id: "surveymonkey",
    name: "SurveyMonkey",
    description: "Online survey platform",
    category: "Survey",
    logo: "🐒",
    isThirdParty: true,
    connected: false,
    features: ["Survey creation", "Data analysis", "Response collection"],
  },
  {
    id: "dialogflow",
    name: "Dialogflow",
    description: "Conversational AI platform",
    category: "AI/ML",
    logo: "🤖",
    isThirdParty: true,
    connected: false,
    features: ["Chatbots", "Natural language processing", "Voice interfaces"],
  },
  {
    id: "confluence",
    name: "Confluence",
    description: "Team workspace",
    category: "Knowledge Base",
    logo: "📖",
    isThirdParty: true,
    connected: false,
    features: ["Documentation", "Knowledge sharing", "Team collaboration"],
  },
  {
    id: "helpscout",
    name: "Help Scout",
    description: "Customer service platform",
    category: "Support",
    logo: "🏕️",
    isThirdParty: true,
    connected: false,
    features: ["Help desk", "Knowledge base", "Live chat"],
  },
  {
    id: "aws-comprehend",
    name: "AWS Comprehend",
    description: "Natural language processing service",
    category: "AI/ML",
    logo: "☁️",
    isThirdParty: true,
    connected: false,
    features: [
      "Sentiment analysis",
      "Entity recognition",
      "Language detection",
    ],
  },
  {
    id: "google-ai",
    name: "Google AI",
    description: "Machine learning platform",
    category: "AI/ML",
    logo: "🧠",
    isThirdParty: true,
    connected: false,
    features: ["Machine learning", "Natural language API", "Vision API"],
  },
  {
    id: "receipt-bank",
    name: "Receipt Bank",
    description: "Expense management platform",
    category: "Finance",
    logo: "🧾",
    isThirdParty: true,
    connected: false,
    features: ["Receipt capture", "Data extraction", "Bookkeeping integration"],
  },
  {
    id: "shoeboxed",
    name: "Shoeboxed",
    description: "Receipt and document management",
    category: "Finance",
    logo: "👞",
    isThirdParty: true,
    connected: false,
    features: ["Receipt scanning", "Expense tracking", "Tax preparation"],
  },
];

// All available workflows (for browse/connect functionality)
export const allWorkflows = Object.values(departmentWorkflows).flat();

export const availableBundles: Bundle[] = [
  {
    id: "bundle-1",
    name: "Solo Business Starter",
    description: "Perfect for entrepreneurs and freelancers",
    workflows: departmentWorkflows["Solo Business"],
  },
  {
    id: "bundle-2",
    name: "Marketing Growth Pack",
    description: "Scale your marketing efforts efficiently",
    popular: true,
    workflows: departmentWorkflows["Marketing"],
  },
  {
    id: "bundle-3",
    name: "Sales Acceleration Suite",
    description: "Close more deals faster",
    workflows: departmentWorkflows["Sales"],
  },
  {
    id: "bundle-4",
    name: "Customer Success Bundle",
    description: "Deliver exceptional customer support",
    workflows: departmentWorkflows["Customer Support"],
  },
  {
    id: "bundle-5",
    name: "Finance Management Suite",
    description: "Streamline your financial operations",
    workflows: departmentWorkflows["Finance"],
  },
];

export const mtpSoftware: MTPSoftware[] = [
  {
    id: "mtp-1",
    name: "ProjectFlow Pro",
    description:
      "Complete project management solution with AI-powered insights",
    category: "Project Management",
    logo: "📊",
    lifetimePrice: 299,
    popular: true,
    features: [
      "Unlimited projects and users",
      "AI-powered task prioritization",
      "Advanced reporting & analytics",
      "Team collaboration tools",
      "Custom workflows",
    ],
    url: "https://projectflow.mytechpassport.com",
  },
  {
    id: "mtp-2",
    name: "DocuVault",
    description:
      "Secure document management with advanced search and versioning",
    category: "Document Management",
    logo: "📁",
    lifetimePrice: 199,
    features: [
      "Unlimited storage",
      "Version control",
      "OCR text search",
      "Access permissions",
      "Audit logs",
    ],
  },
  {
    id: "mtp-3",
    name: "TeamSync",
    description: "Real-time team communication and collaboration platform",
    category: "Communication",
    logo: "💬",
    lifetimePrice: 149,
    popular: true,
    features: [
      "Unlimited channels",
      "Video conferencing",
      "Screen sharing",
      "File sharing",
      "Integration APIs",
    ],
    url: "https://teamsync.mytechpassport.com",
  },
  {
    id: "mtp-4",
    name: "InvoiceMaster",
    description: "Professional invoicing and billing automation",
    category: "Finance",
    logo: "💰",
    lifetimePrice: 179,
    features: [
      "Automated invoicing",
      "Payment tracking",
      "Multi-currency support",
      "Custom branding",
      "Financial reports",
    ],
    url: "https://invoicemaster.mytechpassport.com",
  },
  {
    id: "mtp-5",
    name: "CustomerHub",
    description: "All-in-one CRM with sales pipeline management",
    category: "CRM",
    logo: "👥",
    lifetimePrice: 249,
    features: [
      "Contact management",
      "Sales pipeline",
      "Email integration",
      "Custom fields",
      "Activity tracking",
    ],
  },
  {
    id: "mtp-6",
    name: "AnalyticsIQ",
    description: "Business intelligence and data visualization platform",
    category: "Analytics",
    logo: "📈",
    lifetimePrice: 349,
    features: [
      "Custom dashboards",
      "Real-time analytics",
      "Data connectors",
      "Automated reports",
      "Predictive insights",
    ],
  },
  {
    id: "mtp-7",
    name: "FormBuilder",
    description: "Drag-and-drop form builder with advanced logic",
    category: "Forms",
    logo: "📋",
    lifetimePrice: 99,
    features: [
      "Drag-and-drop interface",
      "Conditional logic",
      "File uploads",
      "Payment integration",
      "Custom branding",
    ],
  },
];

// LoanLink Mock Data Types and Interfaces
export interface VendorFinancialData {
  revenue: {
    last12Months: number;
    monthlyAverage: number;
    growth: number;
  };
  cashFlow: {
    last6Months: number;
    monthlyAverage: number;
  };
  debt: {
    totalDebt: number;
    monthlyDebtRepayment: number;
    debtToIncomeRatio: number;
  };
  customerRetention: {
    retentionRate: number;
    churnRate: number;
  };
  businessLongevity: {
    yearsOperational: number;
  };
  financialHealthScore: number;
  loanEligibility: {
    status: "Eligible" | "Borderline" | "Ineligible";
    maxLoanAmount: number;
  };
}

export interface ImprovementSuggestion {
  id: string;
  action: string;
  impact: string;
  priority: "High" | "Medium" | "Low";
  category: "Revenue" | "Debt" | "Retention" | "Cash Flow";
}

export interface LoanApplication {
  id: string;
  status: "Pending" | "Under Review" | "Approved" | "Denied" | "Funded";
  submittedDate: string;
  requestedAmount: number;
  timeline: LoanApplicationEvent[];
}

export interface LoanApplicationEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "current" | "pending";
}

// Mock Vendor Financial Data
export const mockVendorData: VendorFinancialData = {
  revenue: {
    last12Months: 120000,
    monthlyAverage: 10000,
    growth: 5,
  },
  cashFlow: {
    last6Months: 25000,
    monthlyAverage: 4166,
  },
  debt: {
    totalDebt: 30000,
    monthlyDebtRepayment: 1500,
    debtToIncomeRatio: 0.25,
  },
  customerRetention: {
    retentionRate: 80,
    churnRate: 10,
  },
  businessLongevity: {
    yearsOperational: 3,
  },
  financialHealthScore: 85,
  loanEligibility: {
    status: "Eligible",
    maxLoanAmount: 50000,
  },
};

// Mock Improvement Suggestions
export const mockImprovementSuggestions: ImprovementSuggestion[] = [
  {
    id: "suggestion-1",
    action: "Increase monthly revenue by 10%",
    impact: "Improve loan eligibility by 15%",
    priority: "High",
    category: "Revenue",
  },
  {
    id: "suggestion-2",
    action: "Reduce debt-to-income ratio to 0.2",
    impact: "Increase loan eligibility by 20%",
    priority: "High",
    category: "Debt",
  },
  {
    id: "suggestion-3",
    action: "Improve customer retention to 85%",
    impact: "Boost financial health score by 8%",
    priority: "Medium",
    category: "Retention",
  },
  {
    id: "suggestion-4",
    action: "Increase monthly cash flow by $1,000",
    impact: "Enhance loan terms and interest rates",
    priority: "Medium",
    category: "Cash Flow",
  },
];

// Mock Loan Application Data
export const mockLoanApplication: LoanApplication = {
  id: "loan-app-001",
  status: "Under Review",
  submittedDate: "2024-10-15",
  requestedAmount: 45000,
  timeline: [
    {
      id: "event-1",
      title: "Application Submitted",
      description: "Your loan application has been successfully submitted",
      date: "2024-10-15",
      status: "completed",
    },
    {
      id: "event-2",
      title: "Document Verification",
      description:
        "We are verifying your financial documents and business data",
      date: "2024-10-16",
      status: "completed",
    },
    {
      id: "event-3",
      title: "Credit Assessment",
      description: "Our team is conducting a comprehensive credit assessment",
      date: "2024-10-18",
      status: "current",
    },
    {
      id: "event-4",
      title: "Final Review",
      description: "Final review and approval process",
      date: "2024-10-22",
      status: "pending",
    },
    {
      id: "event-5",
      title: "Decision Notification",
      description: "You will receive the final decision via email",
      date: "2024-10-25",
      status: "pending",
    },
  ],
};

// Alternative vendor data scenarios for testing
export const mockVendorDataBorderline: VendorFinancialData = {
  revenue: {
    last12Months: 80000,
    monthlyAverage: 6667,
    growth: 2,
  },
  cashFlow: {
    last6Months: 15000,
    monthlyAverage: 2500,
  },
  debt: {
    totalDebt: 25000,
    monthlyDebtRepayment: 1200,
    debtToIncomeRatio: 0.35,
  },
  customerRetention: {
    retentionRate: 70,
    churnRate: 15,
  },
  businessLongevity: {
    yearsOperational: 2,
  },
  financialHealthScore: 65,
  loanEligibility: {
    status: "Borderline",
    maxLoanAmount: 25000,
  },
};

export const mockVendorDataIneligible: VendorFinancialData = {
  revenue: {
    last12Months: 40000,
    monthlyAverage: 3333,
    growth: -2,
  },
  cashFlow: {
    last6Months: 8000,
    monthlyAverage: 1333,
  },
  debt: {
    totalDebt: 20000,
    monthlyDebtRepayment: 1000,
    debtToIncomeRatio: 0.45,
  },
  customerRetention: {
    retentionRate: 60,
    churnRate: 25,
  },
  businessLongevity: {
    yearsOperational: 1,
  },
  financialHealthScore: 45,
  loanEligibility: {
    status: "Ineligible",
    maxLoanAmount: 0,
  },
};

export interface CreditPack {
  id: string;
  amount: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

// Mock Credit Packs
export const creditPacks: CreditPack[] = [
  { id: "pack-10", amount: 10, price: 10, bonus: 0 },
  { id: "pack-25", amount: 25, price: 25, bonus: 0 },
  { id: "pack-50", amount: 50, price: 50, bonus: 0, popular: true },
  { id: "pack-100", amount: 100, price: 100, bonus: 0 },
  { id: "pack-200", amount: 200, price: 200, bonus: 0 },
  { id: "pack-250", amount: 250, price: 250, bonus: 0 },
];
