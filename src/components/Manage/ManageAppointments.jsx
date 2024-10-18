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
          appointment.id === id
            ? { ...appointment, status: "accepted" }
            : appointment
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
          appointment.id === id
            ? { ...appointment, status: "declined" }
            : appointment
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="font-semibold text-xl text-blue-600 mb-2">
                {appointment.title}
              </h3>
              <p className="text-gray-700">{appointment.description}</p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Date:</span>{" "}
                {new Date(appointment.date.seconds * 1000).toLocaleDateString()}
                <br />
                <span className="font-bold">Time:</span> {appointment.time}
                <br />
                <span className="font-bold">Scheduled with User ID:</span>{" "}
                {appointment.targetUserId}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAccept(appointment.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(appointment.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
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
