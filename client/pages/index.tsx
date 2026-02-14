import React, { useEffect, useState } from "react";

function Index() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3100/api/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-3xl font-bold text-blue-600">
        {message}
      </div>
    </div>
  );
}

export default Index;
