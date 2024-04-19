import { WebsiteGuard } from "@/src/auth/guard/website-guard";
import AccountLayout from "@/src/layouts/account";
import React, { ReactNode } from "react";

interface AccountMainLyoutProps {
  children: ReactNode;
}

export default function AccountLayoutPage({ children }: AccountMainLyoutProps) {
  return (
    <WebsiteGuard>
      <AccountLayout>{children}</AccountLayout>
    </WebsiteGuard>
  );
}
