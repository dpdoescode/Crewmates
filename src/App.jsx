import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCrewmate from "./pages/CreateCrewmate";
import CrewmateList from "./pages/CrewmateList";
import EditCrewmate from "./pages/EditCrewmate";
import CrewDetail from "./pages/CrewDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrewmateList />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/crew/:id" element={<CrewDetail />} />
        <Route path="/edit/:id" element={<EditCrewmate />} />
      </Routes>
    </BrowserRouter>
  );
}
