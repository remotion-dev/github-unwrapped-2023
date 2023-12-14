import { useEffect, useState } from "react";
import { AbsoluteFill } from "remotion";

const wait = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const Dashboard = () => {
  const [numberOfRenders, setNumberOfRenders] = useState<number | null>(null);

  const root = window.document.getElementById("root");
  if (root) {
    root.style.display = "flex";
    root.style.justifyContent = "center";
    root.style.flex = "1";
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      setNumberOfRenders(data.nrOfRenders);
      await wait(5000);
      fetchData();
    };

    fetchData();
  }, []);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div>Number of renders: {numberOfRenders}</div>
    </AbsoluteFill>
  );
};
