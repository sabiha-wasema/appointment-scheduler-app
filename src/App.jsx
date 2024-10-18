
// import './App.css'

import { useState } from "react";
import ManageAppointments from "./components/Manage/ManageAppointments"
import ScheduleAppointment from "./components/Schedule/SheduleAppointment"
import UserSearch from "./components/Users/UserSearch"

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };
  

  return (
   <div className="flex flex-col justify-center items-center">
    <h1 className="text-3xl mt-10 font-bold">Appointment Scheduler</h1>
      <UserSearch onUserSelect={handleUserSelect} />
      {selectedUserId && <ScheduleAppointment targetUserId={selectedUserId} />}
      <ManageAppointments />
   </div>
  )
}

export default App
