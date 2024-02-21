import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<unknown>(null);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify("How many vendors are in the table?"),
    })
     
      res = await res.json();
      return res
    }
    fetchData().then(res => setMessage(res.text));
  }, []);

  return <h1>Message: {JSON.stringify(message)}</h1>;
}

export default App;
