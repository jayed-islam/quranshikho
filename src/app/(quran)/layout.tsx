import QuranMainLayout from "@/src/layouts/quran";
import React, { ReactNode } from "react";

interface QuranMainLayoutProps {
  children: ReactNode;
}

export default function QuranLayoutPage({ children }: QuranMainLayoutProps) {
  return <QuranMainLayout>{children}</QuranMainLayout>;
}
