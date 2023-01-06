import { useEffect } from "react";
import useSocket from "./hooks/useSocket";
import { CustomNavbar as Navbar } from "./component/CustomNavbar";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { TiktokLiveChat } from "./Pages/TiktokLiveChat";
import { Analytics } from "./Pages/Analytics";
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

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<TiktokLiveChat />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
