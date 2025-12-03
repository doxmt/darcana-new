import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6ff]">
      <Header />

      <main className="flex-1 p-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
