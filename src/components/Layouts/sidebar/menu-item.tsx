"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useSidebarContext } from "./sidebar-context";

const menuItemBaseStyles = cva(
  "rounded-xl px-3.5 font-medium transition-all duration-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-transparent",
  {
    variants: {
      isActive: {
        true: `
          bg-gradient-to-r from-blue-50 to-blue-50/50 
          text-blue-700
          shadow-sm
          border border-blue-100
          hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50/50
          hover:shadow-md
        `,
        false: `
          hover:bg-gray-50/80
          hover:text-gray-800
          hover:shadow-sm
          hover:scale-[1.02]
        `,
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export function MenuItem(
  props: {
    className?: string;
    children: React.ReactNode;
    isActive: boolean;
  } & ({ as?: "button"; onClick: () => void } | { as: "link"; href: string }),
) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        // Close sidebar on clicking link if it's mobile
        onClick={() => isMobile && toggleSidebar()}
        className={cn(
          menuItemBaseStyles({
            isActive: props.isActive,
            className: "relative block py-2",
          }),
          props.className,
        )}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      aria-expanded={props.isActive}
      className={cn(
        menuItemBaseStyles({
          isActive: props.isActive,
          className: "flex w-full items-center gap-3 py-3",
        }),
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
