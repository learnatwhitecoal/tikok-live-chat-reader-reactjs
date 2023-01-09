import { useEffect } from "react";
import useSocket from "./hooks/useSocket";
import { ToastContainer } from "react-toastify";
import { CustomNavbar as Navbar } from "./component/CustomNavbar";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { TiktokLiveChat } from "./Pages/TiktokLiveChat";
import { useSocketStore } from "./store/store";
function App() {
  const socket = useSocket("http://localhost:8000");
  const { setSocket } = useSocketStore((state) => state);
  useEffect(() => {
    if (socket) {
      setSocket(socket);
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
  }, [socket,setSocket]);

  return (
    <div className="main-app font-primary">
      <ToastContainer
        autoClose={1000}
        position="top-right"
        pauseOnHover={false}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<TiktokLiveChat />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
