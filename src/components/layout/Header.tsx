import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/daily", label: "오늘의 타로" },
  { to: "/theme", label: "테마 타로" },
  { to: "/analysis", label: "카드 해석" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white text-black px-4 py-4 sm:px-6 flex items-center justify-between border-b border-gray-200">
      <Link
        to="/"
        className="text-2xl font-bold hover:opacity-80 transition"
        onClick={() => setIsOpen(false)}
      >
        Darcana
      </Link>

      <nav className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="hover:text-[#5c4ac7] hover:underline underline-offset-4 hover:decoration-[#5c4ac7] transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex w-5 flex-col gap-1.5">
          <span className="h-0.5 w-full rounded-full bg-gray-900" />
          <span className="h-0.5 w-full rounded-full bg-gray-900" />
          <span className="h-0.5 w-full rounded-full bg-gray-900" />
        </span>
      </button>

      {isOpen && (
        <nav className="absolute left-0 right-0 top-full flex flex-col border-b border-gray-200 bg-white px-4 py-3 shadow-lg md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-2 py-3 font-medium transition hover:bg-[#f4efff] hover:text-[#5c4ac7]"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
