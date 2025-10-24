"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const path = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Campaigns", href: "/campaigns" },
    { name: "Create Campaign", href: "/campaigns/create" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-300 opacity-60 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed md:static top-0 left-0 z-30 h-full md:h-auto w-64 bg-white shadow-md p-4 flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Menu</h1>
          <button
            onClick={onClose}
            className="md:hidden text-gray-600 hover:text-black text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`p-2 rounded hover:bg-gray-200 ${
                path === link.href ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
