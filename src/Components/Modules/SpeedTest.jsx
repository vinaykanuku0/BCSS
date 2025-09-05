import React, { useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const SpeedTest = () => {
  const [speed, setSpeed] = useState(0); // final measured speed
  const [displaySpeed, setDisplaySpeed] = useState(0); // animated speed

  // Download test (image load method)
  const testDownload = () => {
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg";
    const fileSizeInBytes = 5245329; // ~5MB
    const startTime = new Date().getTime();

    const img = new Image();
    img.src = imageUrl + "?cache=" + startTime;

    img.onload = () => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // seconds
      const bitsLoaded = fileSizeInBytes * 8;
      const speedMbps = (bitsLoaded / duration / 1024 / 1024).toFixed(2);

      setSpeed(Number(speedMbps));

      // Animate from 0 → speed
      let current = 0;
      const step = Math.ceil(speedMbps / 30);
      const interval = setInterval(() => {
        current += step;
        if (current >= speedMbps) {
          current = speedMbps;
          clearInterval(interval);
        }
        setDisplaySpeed(current);
      }, 50);
    };
  };

  // Gauge data
  const data = [{ name: "Speed", value: displaySpeed, fill: "#4F46E5" }];

  return (
    <div className="flex flex-col items-center p-6">
      {/* <h1 className="text-2xl font-bold">Internet Speed Test</h1> */}

      <div className="mt-4">
        <RadialBarChart
          width={350}
          height={300}
          innerRadius="70%"
          outerRadius="85%"
          barSize={15}
          data={data}
          startAngle={170}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 150]} // scale up to 150 Mbps
            tick={{ fill: "#333", fontSize: 12 }}
            ticks={[0, 25, 50, 75, 100, 125, 150]} // values around circle
          />
          <RadialBar dataKey="value" cornerRadius={5} />
        </RadialBarChart>
      </div>

      <p className="mt-4 text-3xl font-semibold">
        {displaySpeed} Mbps
      </p>

      <button
        onClick={testDownload}
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg shadow-md"
      >
        Start Test
      </button>
    </div>
  );
};

export default SpeedTest;
