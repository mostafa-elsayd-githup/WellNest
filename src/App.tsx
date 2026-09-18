import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Dashbord from "./routes/dashbord";
import Appointment from "./routes/appointment";
import Pations from "./routes/pations";
import Doctors from "./routes/doctors";
import Departments from "./routes/departments";
import Doctors_Schedule from "./routes/doctors_Schedule";
import Payments from "./routes/Payments";
import Enventory from "./routes/enventory";
import Messages from "./routes/messages";
import Layout from "./layout";
import DepartmentsDetails from "./routes/layout/DepartmentsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashbord />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="Pations" element={<Pations />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="departments" element={<Departments />} />
          <Route path="departments/:id" element={<DepartmentsDetails />} />
          <Route path="doctors_Schedule" element={<Doctors_Schedule />} />
          <Route path="payments" element={<Payments />} />
          <Route path="enventory" element={<Enventory />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
