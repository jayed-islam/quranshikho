import { WebsiteGuard } from "@/src/auth/guard/website-guard";
import React, { ReactNode } from "react";

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: CheckoutLayoutProps) {
  return <WebsiteGuard>{children}</WebsiteGuard>;
}
