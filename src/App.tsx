import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import DailyTarot from "./pages/DailyTarot";
import ThemeTarot from "./pages/ThemeTarot.tsx";
import Interpret from "./pages/Interpret";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="daily" element={<DailyTarot />} />
        <Route path="theme" element={<ThemeTarot />} />
        <Route path="interpret" element={<Interpret />} />
      </Route>
    </Routes>
  );
}
