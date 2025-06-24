"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  useEffect(() => {
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        return item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }
            return true;
          }
        });
      });
    });
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden transition-all duration-300 ease-in-out",
          // Background claro e minimalista
          "bg-white/95 text-gray-800 backdrop-blur-xl",
          // Bordas arredondadas sem bordas pretas
          "rounded-r-3xl",
          // Sombra sutil e elegante
          "shadow-[8px_0_32px_rgba(0,0,0,0.08)]",
          // Removendo qualquer border que cause linhas pretas
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
      >
        {/* Container interno com padding melhorado */}
        <div className="flex h-full flex-col py-8 pl-6 pr-4">
          {/* Header do sidebar */}
          <div className="relative mb-8 pr-4">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="block px-0 py-2"
            >
              {/* Logo placeholder */}
              <div className="text-xl font-bold text-gray-800">LOGO</div>
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="size-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Navigation com scroll customizado */}
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-2">
            {NAV_DATA.map((section, sectionIndex) => (
              <div
                key={section.label}
                className={cn("mb-8", sectionIndex === 0 && "mt-0")}
              >
                {/* Section Label com estilo minimalista */}
                <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            {/* Menu item com submenu */}
                            <div className="group">
                              <MenuItem
                                isActive={item.items.some(
                                  ({ url }) => url === pathname,
                                )}
                                onClick={() => toggleExpanded(item.title)}
                                className="rounded-xl transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                              >
                                <div className="flex items-center gap-3 px-3 py-3">
                                  <div className="rounded-lg bg-gray-100 p-2 transition-colors group-hover:bg-gray-200">
                                    <item.icon
                                      className="size-5 shrink-0 text-gray-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="font-medium text-gray-700">
                                    {item.title}
                                  </span>
                                  <ChevronUp
                                    className={cn(
                                      "ml-auto size-4 rotate-180 text-gray-400 transition-transform duration-200",
                                      expandedItems.includes(item.title) &&
                                        "rotate-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                </div>
                              </MenuItem>
                            </div>

                            {/* Submenu com animação */}
                            {expandedItems.includes(item.title) && (
                              <div className="animate-in slide-in-from-top-2 mt-2 duration-200">
                                <ul
                                  className="ml-6 space-y-1 border-l-2 border-gray-100 pl-4"
                                  role="menu"
                                >
                                  {item.items.map((subItem) => (
                                    <li key={subItem.title} role="none">
                                      <MenuItem
                                        as="link"
                                        href={subItem.url}
                                        isActive={pathname === subItem.url}
                                        className="rounded-lg transition-all duration-200 hover:translate-x-1 hover:bg-gray-50"
                                      >
                                        <div className="px-3 py-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            {subItem.title}
                                          </span>
                                        </div>
                                      </MenuItem>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          (() => {
                            const href =
                              "url" in item
                                ? item.url + ""
                                : "/" +
                                  item.title.toLowerCase().split(" ").join("-");

                            return (
                              <div className="group">
                                <MenuItem
                                  as="link"
                                  href={href}
                                  isActive={pathname === href}
                                  className="rounded-xl transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                                >
                                  <div className="flex items-center gap-3 px-3 py-3">
                                    <div className="rounded-lg bg-gray-100 p-2 transition-colors group-hover:bg-gray-200">
                                      <item.icon
                                        className="size-5 shrink-0 text-gray-600"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <span className="font-medium text-gray-700">
                                      {item.title}
                                    </span>
                                  </div>
                                </MenuItem>
                              </div>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
