import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [numberOfRenders, setNumberOfRenders] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard");

      const data = await response.json();

      setNumberOfRenders(data.nrOfRenders);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div> Dashboard</div>
      <div> Number of Renders {numberOfRenders}</div>
    </div>
  );
};
