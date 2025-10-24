"use client";

import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-2xl font-bold"
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">Mini Campaign Manager</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
