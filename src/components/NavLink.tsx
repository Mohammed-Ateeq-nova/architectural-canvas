"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to?: string;
  href?: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, to, ...props }, ref) => {
    const pathname = usePathname();
    const destination = href || to || "/";
    const isActive = pathname === destination;

    return (
      <Link
        ref={ref}
        href={destination}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
