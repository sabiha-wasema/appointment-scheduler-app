import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.init';
import { getAuth } from 'firebase/auth';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not logged in.");
        setLoading(false);
        return;
      }

      const currentUserId = user.uid;

      try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(appointmentsRef, where('userId', '==', currentUserId));
        const appointmentSnapshot = await getDocs(q);
        const appointmentList = appointmentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched Appointments:", appointmentList); 
        setAppointments(appointmentList);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-red-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="font-semibold text-lg">{appointment.title}</h3>
              <p>{appointment.description}</p>
              <p>
                Date: {new Date(appointment.date.seconds * 1000).toLocaleDateString()}<br />
                Time: {appointment.time}<br />
                Scheduled with User ID: {appointment.targetUserId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
