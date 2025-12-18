import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative bg-white text-black px-6 py-4 flex items-center border-b border-gray-200">
      <Link to="/" className="text-2xl font-bold hover:opacity-80 transition">
        Darcana
      </Link>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6">
        <Link
          to="/daily"
          className="hover:text-[#5c4ac7] hover:underline underline-offset-4 hover:decoration-[#5c4ac7] transition"
        >
          오늘의 타로
        </Link>

        <Link
          to="/theme"
          className="hover:text-[#5c4ac7] hover:underline underline-offset-4 hover:decoration-[#5c4ac7] transition"
        >
          테마 타로
        </Link>

        <Link
          to="/analysis"
          className="hover:text-[#5c4ac7] hover:underline underline-offset-4 hover:decoration-[#5c4ac7] transition"
        >
          카드 해석
        </Link>
      </nav>
    </header>
  );
}
