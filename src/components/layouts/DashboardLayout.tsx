import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  CircleUser,
  PlusCircle,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { BuyCreditsModal } from "../dashboard/BuyCreditsModal";

// Sidebar is commented out - keeping interfaces for future use
// interface NavItem {
//   label: string;
//   path: string;
//   icon: React.ReactNode;
// }

interface DropdownItem {
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  navItems?: unknown[]; // Kept for backward compatibility, sidebar is disabled
  title: string;
  subtitle?: string;
  headerIcon: React.ReactNode;
  profileDropdownItems: DropdownItem[];
}

export const DashboardLayout = ({
  // navItems, // Sidebar disabled
  title,
  subtitle,
  headerIcon,
  profileDropdownItems,
}: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [isBuyCreditsOpen, setIsBuyCreditsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button removed - sidebar is disabled */}
            <div>
              <Link className="flex" to="/">
                {headerIcon}
              </Link>
              {/* <h1 className="text-xl font-bold">{title}</h1> */}
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme selector: system (default), light, dark */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  {resolvedTheme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : resolvedTheme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={5}>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* AI Credits for Users */}
            {user?.role === "user" && (
              <Dialog
                open={isBuyCreditsOpen}
                onOpenChange={setIsBuyCreditsOpen}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    <span className="hidden sm:inline">Credits: </span>
                    {user.credits || 0}
                  </span>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only">Buy Credits</span>
                    </Button>
                  </DialogTrigger>
                </div>
                <BuyCreditsModal
                  open={isBuyCreditsOpen}
                  onOpenChange={setIsBuyCreditsOpen}
                >
                  <div />
                </BuyCreditsModal>
              </Dialog>
            )}
            {/* Profile Dropdown */}
            <div className="relative flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full flex-shrink-0"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-32"
                  sideOffset={5}
                  alignOffset={0}
                >
                  <DropdownMenuLabel>
                    {user?.name || "My Account"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {profileDropdownItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="cursor-pointer">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - full width (sidebar disabled) */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Sidebar commented out for full-width layout
      <div className="flex">
        <aside
          className={cn(
            "fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] bg-background/95 backdrop-blur border-r border-border/40 transition-all duration-300 z-40",
            sidebarOpen ? "w-64" : "w-0 lg:w-16"
          )}
        >
          <div className="flex flex-col h-full pt-6">
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link to={item.path}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3",
                            !sidebarOpen && "lg:justify-center lg:px-2"
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {sidebarOpen && <span>{item.label}</span>}
                        </Button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {sidebarOpen && user && (
              <div className="p-4 border-t border-border/40">
                <div className="text-sm">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "lg:ml-0" : "lg:ml-0"
          )}
        >
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      */}
    </div>
  );
};
