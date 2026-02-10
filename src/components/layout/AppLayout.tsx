import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-card">
      <header className="h-[55px] bg-primary flex items-center justify-between px-6">
        <img src="/logo.svg" className="h-[42px]" alt="logo" />
        <Avatar className="size-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-[#24467a] text-[#afc2d8] border border-[#3F6CA9]">
            JD
          </AvatarFallback>
        </Avatar>
      </header>
      <main className="relative bg-card grid grid-cols-12">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-10 min-h-screen page-container"
        >
          <Outlet />
        </motion.main>
      </main>
    </div>
  );
}
