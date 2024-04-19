import "./globals.css";
import { ThemeProvider } from "../components/material-tailwind-component/material-tailwind";
import localFont from "next/font/local";
import { ReduxProvider } from "../redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { Roboto_Condensed } from "next/font/google";

const myFont = localFont({
  src: "../../public/fonts/KFGQPC_Uthman_Taha_Naskh_Regular.ttf",
  display: "swap",
  variable: "--font-uthmani",
});

const myFont2 = localFont({
  src: "../../public/fonts/Satoshi-Bold.ttf",
  display: "swap",
  variable: "--font-satoshi",
});

const roboto_condensed = Roboto_Condensed({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_condensed.className}>
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <div className={myFont.variable}>
              <div>{children}</div>
            </div>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
