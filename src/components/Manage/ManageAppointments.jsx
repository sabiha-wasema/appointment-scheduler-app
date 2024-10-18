import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.init";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPast, setFilterPast] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const currentUserId = user.uid;

      try {
        const appointmentsRef = collection(db, "appointments");
        const q = query(appointmentsRef, where("userId", "==", currentUserId));
        const appointmentSnapshot = await getDocs(q);
        const appointmentList = appointmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(appointmentList);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Error fetching appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date.seconds * 1000);
    const isPast = appointmentDate < new Date();
    const matchesSearch = appointment.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch && (!filterPast || !isPast);
  });

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (confirmCancel) {
      try {
        await updateDoc(doc(db, "appointments", id), { canceled: true });
        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== id)
        );
        toast.success("Appointment canceled successfully!");
      } catch (error) {
        toast.error("Error canceling appointment. Please try again later.");
      }
    }
  };

  const handleAccept = async (id) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status: "accepted" });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "accepted" } : appointment
        )
      );
      toast.success("Appointment accepted successfully!");
    } catch (error) {
      toast.error("Error accepting appointment. Please try again later.");
    }
  };

  const handleDecline = async (id) => {
    console.log("Declining appointment with id:", id); 
    try {
      await updateDoc(doc(db, "appointments", id), { status: "declined" });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "declined" } : appointment
        )
      );
      toast.success("Appointment declined successfully!");
    } catch (error) {
      console.error("Error declining appointment:", error);
      toast.error("Error declining appointment. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full p-3 border border-gray-300 rounded-lg"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={filterPast}
          onChange={(e) => setFilterPast(e.target.checked)}
          className="mr-2"
        />
        Filter past appointments
      </label>
      {filteredAppointments.length === 0 ? (
        <p className="text-red-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h3 className="font-semibold text-lg">{appointment.title}</h3>
              <p>{appointment.description}</p>
              <p>
                Date:{" "}
                {new Date(appointment.date.seconds * 1000).toLocaleDateString()}
                <br />
                Time: {appointment.time}
                <br />
                Scheduled with User ID: {appointment.targetUserId}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAccept(appointment.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(appointment.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
