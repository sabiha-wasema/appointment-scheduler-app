import { useEffect, useState } from "react";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <div>
      <h1>Our Features : {features.length}</h1>
    </div>
  );
};

export default Features;
