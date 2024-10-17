import { useEffect, useState } from "react";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/public/features.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data?.features);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Our Features : {features.length}</h1>
    </div>
  );
};

export default Features;
