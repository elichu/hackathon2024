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
    <>
      <div id="input-wrapper">
        <div id="header-wrapper">
          <img id="ilx-icon-main" src="ILXIcon.svg" alt="" />
          <h1 id="app-title">DBQueryGPT</h1>
        </div>
        <span>
          Ask me for any kind of data you need in plain english! No more writing
          complex queries for our users.
        </span>
        <form id="input-form" onSubmit={fetchData}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What can I help you with?"
          />
          <button type="submit">Query</button>
        </form>
      </div>
      {message && (
        <div id="result-board">
          <h1>Here are your results:</h1>
          <p>{JSON.stringify(message)}</p>
        </div>
      )}
    </>
  );
}

export default App;
