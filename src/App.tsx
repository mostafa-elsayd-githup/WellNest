import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./routes/dashboard";
import Appointment from "./routes/appointment";
import Patients from "./routes/patients";
import Doctors from "./routes/Doctors/Doctors";
import Departments from "./routes/Departments";
import DoctorsSchedule from "./routes/doctorsSchedule";
import Payments from "./routes/Payments";
import Inventory from "./routes/inventory";
import Messages from "./routes/messages";
import Layout from "./layout";
import DepartmentsDetails from "./routes/layout/DepartmentsDetails";
import DoctorDetails from "./routes/layout/DoctorDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:profileID" element={<DoctorDetails />} />
          <Route path="departments" element={<Departments />} />
          <Route path="departments/:name" element={<DepartmentsDetails />} />
          <Route path="doctors-schedule" element={<DoctorsSchedule />} />
          <Route path="payments" element={<Payments />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
