import * as React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// Ícones SVG simples
const HomeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & BreadcrumbProps
>(({ items, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className="mb-6 flex items-center space-x-2 text-sm text-gray-600"
    {...props}
  >
    <Link href="/" className="flex items-center hover:text-blue-600">
      <HomeIcon />
    </Link>
    {items.map((item, index) => (
      <div key={index} className="flex items-center space-x-2">
        <ChevronRightIcon />
        {item.href ? (
          <Link href={item.href} className="hover:text-blue-600">
            {item.label}
          </Link>
        ) : (
          <span className="font-medium text-gray-900">{item.label}</span>
        )}
      </div>
    ))}
  </nav>
));
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = () => null;
export const BreadcrumbItem = () => null;
export const BreadcrumbLink = () => null;
export const BreadcrumbPage = () => null;
export const BreadcrumbSeparator = () => null;
export const BreadcrumbEllipsis = () => null;
