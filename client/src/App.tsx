import { useEffect } from "react";
import useSocket from "./hooks/useSocket";

function App() {
  const socket = useSocket("http://localhost:8000");

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket");
      });
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [socket]);
  return <div className="App"></div>;
}

export default App;
