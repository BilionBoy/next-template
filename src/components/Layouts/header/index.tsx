"use client";

import { SearchIcon } from "../../../assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between rounded-b-2xl border-b border-gray-100 bg-white/95 px-4 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border border-gray-200 bg-gray-50 px-1.5 py-1 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
      >
        <MenuIcon className="text-gray-600" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt="Logo"
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-gray-800">
          Painel Administrativo
        </h1>
        <p className="font-medium text-gray-600">
          Aqui terá as descrições dinâmicas
        </p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Buscar..."
            className="flex w-full items-center gap-3.5 rounded-full border border-gray-200 bg-gray-50/80 py-3 pl-[53px] pr-5 text-gray-700 placeholder-gray-500 outline-none transition-colors hover:border-gray-300 focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500/20"
          />
          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 max-[1015px]:size-5" />
        </div>

        <ThemeToggleSwitch />
        <Notification />
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
