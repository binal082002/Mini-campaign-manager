import "./globals.css";
import { ReactNode } from "react";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Mini Campaign Manager",
  description: "Manage and track your campaigns easily",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
