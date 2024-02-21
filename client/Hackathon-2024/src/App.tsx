import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<unknown>(null);
  const [value, setValue] = useState<string>("");

  async function fetchData(e: React.FormEvent) {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value }),
    });

    res = await res.json();
    setMessage(res.text);
  }

  return (
    <div>
      <form onSubmit={fetchData}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h1>Message: {JSON.stringify(message)}</h1>
    </div>
  );
}

export default App;
