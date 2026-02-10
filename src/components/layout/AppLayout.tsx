import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-card">
      <header className=" bg-primary flex items-center justify-between px-6 py-2">
        <div className="flex gap-8 items-center">
          <img src="/logo.svg" className="h-[42px]" alt="logo" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Parts"
              value=""
              className="pl-10 border-[#3F6CA9] bg-[#24467a] placeholder-[#3F6CA9]"
            />
          </div>
        </div>
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
