import { useState } from 'react';
import { db } from '../../firebase/firebase.init';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ScheduleAppointment = ({ targetUserId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSchedule = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    console.log("Current User ID:", user ? user.uid : "No user logged in");
    const currentUserId = user ? user.uid : null;

    if (!currentUserId) {
      alert('You must be logged in to schedule an appointment');
      return;
    }

    try {
      setLoading(true);
      const appointmentsRef = collection(db, 'appointments');
      await addDoc(appointmentsRef, {
        title,
        description,
        date,
        time,
        userId: currentUserId, 
        targetUserId,          
      });
      alert('Appointment scheduled successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error scheduling appointment:', error); 
      alert('Error scheduling appointment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSchedule} className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Schedule an Appointment</h2>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <textarea 
          placeholder="Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="4"
          required
        />
      </div>
      <div className="mb-4">
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-6">
        <input 
          type="time" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <button 
        type="submit" 
        className={`w-full py-3 rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all`}
        disabled={loading}
      >
        {loading ? 'Scheduling...' : 'Schedule Appointment'}
      </button>
    </form>
  );
};

export default ScheduleAppointment;
