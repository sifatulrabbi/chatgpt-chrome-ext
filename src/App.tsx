import React, { useEffect } from "react";

const App: React.FC = () => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {}, []);

  return (
    <div className="p-4 min-w-[200px] font-sans">
      <h1 className="text-lg font-bold mb-2">
        Hello from React + TS + Tailwind!
      </h1>
      <p className="mb-2">Count: {count}</p>
      <button
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
        onClick={() => setCount((c) => c + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default App;
