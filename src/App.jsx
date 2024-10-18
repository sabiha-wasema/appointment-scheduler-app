import { useState } from "react";
import ManageAppointments from "./components/Manage/ManageAppointments";
import ScheduleAppointment from "./components/Schedule/SheduleAppointment";
import UserSearch from "./components/Users/UserSearch";
import { ToastContainer } from 'react-toastify';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-teal-500 p-4">
      <h1 className="text-3xl mt-10 font-bold text-center">Appointment Scheduler</h1>
      <ToastContainer />
      <div className="w-full max-w-md mt-5">
        <UserSearch onUserSelect={handleUserSelect} />
        {selectedUserId && <ScheduleAppointment targetUserId={selectedUserId} />}
      </div>
      <div className="w-full max-w-6xl mt-8">
        <ManageAppointments />
      </div>
    </div>
  );
}

export default App;
