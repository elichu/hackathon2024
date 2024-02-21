import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<unknown>(null);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:3000/fetch", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/html",
        },
        body: JSON.stringify("How many vendors are in the table?"),
      });

      res = await res.json();
      return res
    }
    fetchData().then((res) => setMessage(res.text));
  }, []);

  if (!message) return <h1>Loading...</h1>;

  return <h1>Message: {JSON.stringify(message)}</h1>;
}

export default App;
