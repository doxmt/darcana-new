import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-[#f8f6ff]">
      <Header />

      <main className="min-w-0 flex-1 p-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
