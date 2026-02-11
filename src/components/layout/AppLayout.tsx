import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ChevronDown, Bell, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-transparent hover:text-white text-xs"
              >
                Saved Searches
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <span className="text-sm">
                You have not saved any searches yet
              </span>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="text-white bg-transparent hover:bg-transparent hover:text-white border-none text-xs">
            <Zap /> Actions
          </Button>
          <Button variant="outline" size="sm" className="text-white bg-transparent hover:bg-transparent hover:text-white border-none text-xs">
            <Bell /> Alerts
          </Button>
          <div className="flex items-center justify-center size-8 rounded-full bg-[#24467a] text-[#afc2d8] border border-[#3F6CA9]">
            <span className="text-xl">?</span>
          </div>
          <Avatar className="size-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#24467a] text-[#afc2d8] border border-[#3F6CA9]">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                fill="white"
                d="M0 1.71429C0 0.766071 0.766071 0 1.71429 0H4.28571C5.23393 0 6 0.766071 6 1.71429V4.28571C6 5.23393 5.23393 6 4.28571 6H1.71429C0.766071 6 0 5.23393 0 4.28571V1.71429ZM0 10.7143C0 9.76607 0.766071 9 1.71429 9H4.28571C5.23393 9 6 9.76607 6 10.7143V13.2857C6 14.2339 5.23393 15 4.28571 15H1.71429C0.766071 15 0 14.2339 0 13.2857V10.7143ZM6 19.7143V22.2857C6 23.2339 5.23393 24 4.28571 24H1.71429C0.766071 24 0 23.2339 0 22.2857V19.7143C0 18.7661 0.766071 18 1.71429 18H4.28571C5.23393 18 6 18.7661 6 19.7143ZM9 1.71429C9 0.766071 9.76607 0 10.7143 0H13.2857C14.2339 0 15 0.766071 15 1.71429V4.28571C15 5.23393 14.2339 6 13.2857 6H10.7143C9.76607 6 9 5.23393 9 4.28571V1.71429ZM15 10.7143V13.2857C15 14.2339 14.2339 15 13.2857 15H10.7143C9.76607 15 9 14.2339 9 13.2857V10.7143C9 9.76607 9.76607 9 10.7143 9H13.2857C14.2339 9 15 9.76607 15 10.7143ZM9 19.7143C9 18.7661 9.76607 18 10.7143 18H13.2857C14.2339 18 15 18.7661 15 19.7143V22.2857C15 23.2339 14.2339 24 13.2857 24H10.7143C9.76607 24 9 23.2339 9 22.2857V19.7143ZM24 1.71429V4.28571C24 5.23393 23.2339 6 22.2857 6H19.7143C18.7661 6 18 5.23393 18 4.28571V1.71429C18 0.766071 18.7661 0 19.7143 0H22.2857C23.2339 0 24 0.766071 24 1.71429ZM18 10.7143C18 9.76607 18.7661 9 19.7143 9H22.2857C23.2339 9 24 9.76607 24 10.7143V13.2857C24 14.2339 23.2339 15 22.2857 15H19.7143C18.7661 15 18 14.2339 18 13.2857V10.7143ZM24 19.7143V22.2857C24 23.2339 23.2339 24 22.2857 24H19.7143C18.7661 24 18 23.2339 18 22.2857V19.7143C18 18.7661 18.7661 18 19.7143 18H22.2857C23.2339 18 24 18.7661 24 19.7143Z"
              ></path>
            </svg>
          </div>
        </div>
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
