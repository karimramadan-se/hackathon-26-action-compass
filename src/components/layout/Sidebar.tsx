import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  SlidersHorizontal,
  Package,
  LogOut,
  Compass,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/chat", label: "Action Compass", icon: MessageSquare },
  { path: "/simulator", label: "Scenario Simulator", icon: SlidersHorizontal },
  { path: "/parts", label: "Part Risk Analysis", icon: Package },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="col-span-2 border-r border-border flex flex-col bg-background"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg leading-tight">
              Action
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Compass</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}
