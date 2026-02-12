import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  LayoutDashboard,
  User,
  CreditCard,
  HelpCircle,
  Key,
} from "lucide-react";

const UserDashboardLayout = () => {
  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "API Keys",
      path: "/dashboard/api-keys",
      icon: <Key className="w-5 h-5" />,
    },
    {
      label: "Billing",
      path: "/dashboard/billing",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      label: "Support",
      path: "/dashboard/support",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  const profileDropdownItems = [
    { label: "Profile", path: "/dashboard/profile" },
    { label: "API Keys", path: "/dashboard/api-keys" },
    { label: "Billing", path: "/dashboard/billing" },
    { label: "Support", path: "/dashboard/support" },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      title="MTP Tool"
      subtitle=""
      headerIcon={<img src="/logo-gold.svg" alt="MTP Tool" className="w-40" />}
      profileDropdownItems={profileDropdownItems}
    />
  );
};

export default UserDashboardLayout;
