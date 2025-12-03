import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white text-black px-6 py-4 flex justify-between items-center border-b border-gray-200">
      {/* 로고 */}
      <Link to="/" className="text-2xl font-bold hover:opacity-80 transition">
        Darcana
      </Link>

      {/* 네비게이션 */}
      <nav className="flex gap-6">
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
          to="/interpret"
          className="hover:text-[#5c4ac7] hover:underline underline-offset-4 hover:decoration-[#5c4ac7] transition"
        >
          카드 해석
        </Link>
      </nav>

      {/* 로그인 버튼 */}
      <button className="bg-[#5c4ac7] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
        로그인
      </button>
    </header>
  );
}
