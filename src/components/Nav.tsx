"use client";

import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavProps {
  items?: NavItem[];
}

export default function Nav({
  items = [
    { label: "Deal Overview", href: "/overview", isActive: true },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pipeline", href: "/pipeline" },
    { label: "Settings", href: "/settings" },
  ],
}: NavProps) {
  return (
    <div>
      <button className="text-gray-600 hover:text-gray-800 mt-[16px]">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex items-center justify-between mb-4">
        <nav className="flex space-x-6 text-sm">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`${
                item.isActive
                  ? "text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Image src="assets/avatar.svg" alt="logo" width={32} height={32} />

          <input
            type="text"
            placeholder="Ask me anything!"
            className="w-[320px] text-sm text-gray-500 placeholder-gray-400 border-[1px] border-gray-300 rounded-md p-2 shadow-sm"
          />
        </div>

        <Image src="assets/logo.svg" alt="logo" width={74} height={46} />
      </div>
    </div>
  );
}
