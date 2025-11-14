import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateList from './pages/CrewmateList'
import CrewDetail from './pages/CrewDetail'
import EditCrewmate from './pages/EditCrewmate'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateCrewmate />} />
        <Route path="/summary" element={<CrewmateList />} />
        <Route path="/crew/:id" element={<CrewDetail />} />
        <Route path="/crew/:id/edit" element={<EditCrewmate />} />
      </Routes>
    </BrowserRouter>
  )
}
