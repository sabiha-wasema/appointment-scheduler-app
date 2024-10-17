import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./Features.css";
import Modal from "../Modal/Modal";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch("/public/features.json");
        if (!response.ok) {
          throw new Error("Failed to fetch features");
        }
        const data = await response.json();
        setFeatures(data.features);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchedData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  const handleAppointment = (feature) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };
  const handleModalSubmit = (formData) => {
    const appointmentDetails = {
      feature: selectedFeature.title,
      date: formData.date,
      time: formData.time,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    console.log("Appointment scheduled:", appointmentDetails);
    alert(`Appointment scheduled for ${appointmentDetails.feature}.`);
  };

  return (
    <div>
      {/* <h1>Our Features : {features.length}</h1> */}
      <section className="container mx-auto px-20 py-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Features
            <span className="block h-1 w-24 bg-blue-600 mx-auto mt-2 rounded"></span>
          </h2>
          <p className="text-gray-500 text-lg">
            Discover the amazing features that enhance your experience!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
              <button
                onClick={() => handleAppointment(feature)}
                className="mt-4 bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-800 transition duration-300 mx-auto"
              >
                Make an Appointment
              </button>
            </div>
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      </section>
    </div>
  );
};

export default Features;
