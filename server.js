require("dotenv").config();
const connectDB = require("./config/database");
const express = require("express");
const path = require("path");
var cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {
  TikTokConnectionWrapper,
  getGlobalConnectionCount,
} = require("./connectionWrapper");
const { clientBlocked } = require("./limiter");


//connectDB();
const app = express();
const httpServer = createServer(app); //use same app server instance to create httpServer for socket

// Enable cross origin resource sharing
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  let tiktokConnectionWrapper;

  console.info(
    "New connection from origin",
    socket.handshake.headers["origin"] || socket.handshake.headers["referer"]
  );

  //connecting to user live
  socket.on("setUniqueId", (uniqueId, options) => {
    // Prohibit the client from specifying these options (for security reasons)
    if (typeof options === "object" && options) {
      delete options.requestOptions;
      delete options.websocketOptions;
    } else {
      options = {};
    }

    // Session ID in .env file is optional

    //this is used to send automated message using your tiktok id:you might be block or supsended using this.So, be aware
    if (process.env.SESSIONID) {
      options.sessionId = process.env.SESSIONID;
      console.info("Using SessionId");
    }

    // Check if rate limit exceeded
    if (process.env.ENABLE_RATE_LIMIT && clientBlocked(io, socket)) {
      socket.emit(
        "tiktokDisconnected",
        "You have opened too many connections or made too many connection requests. Please reduce the number of connections/requests or host your own server instance. The connections are limited to avoid that the server IP gets blocked by TokTok."
      );
      return;
    }

    // Connect to the given username (uniqueId)
    try {
      tiktokConnectionWrapper = new TikTokConnectionWrapper(
        uniqueId,
        options,
        true
      );
      tiktokConnectionWrapper.connect();
    } catch (err) {
      socket.emit("tiktokDisconnected", err.toString());
      return;
    }

    // Redirect wrapper control events once
    tiktokConnectionWrapper.once("connected", (state) =>
      socket.emit("tiktokConnected", state)
    );
    tiktokConnectionWrapper.once("disconnected", (reason) =>
      socket.emit("tiktokDisconnected", reason)
    );

    // Notify client when stream ends
    tiktokConnectionWrapper.connection.on("streamEnd", () =>
      socket.emit("streamEnd")
    );

    // Redirect message events
    tiktokConnectionWrapper.connection.on("roomUser", (msg) =>
      socket.emit("roomUser", msg)
    );
    tiktokConnectionWrapper.connection.on("member", (msg) =>
      socket.emit("member", msg)
    );
    tiktokConnectionWrapper.connection.on("chat", (msg) =>
      socket.emit("chat", msg)
    );
    tiktokConnectionWrapper.connection.on("gift", (msg) =>
      socket.emit("gift", msg)
    );
    tiktokConnectionWrapper.connection.on("social", (msg) =>
      socket.emit("social", msg)
    );
    tiktokConnectionWrapper.connection.on("like", (msg) =>
      socket.emit("like", msg)
    );
    tiktokConnectionWrapper.connection.on("questionNew", (msg) =>
      socket.emit("questionNew", msg)
    );
    tiktokConnectionWrapper.connection.on("linkMicBattle", (msg) =>
      socket.emit("linkMicBattle", msg)
    );
    tiktokConnectionWrapper.connection.on("linkMicArmies", (msg) =>
      socket.emit("linkMicArmies", msg)
    );
    tiktokConnectionWrapper.connection.on("liveIntro", (msg) =>
      socket.emit("liveIntro", msg)
    );
    tiktokConnectionWrapper.connection.on("emote", (msg) =>
      socket.emit("emote", msg)
    );
    tiktokConnectionWrapper.connection.on("envelope", (msg) =>
      socket.emit("envelope", msg)
    );
    tiktokConnectionWrapper.connection.on("subscribe", (msg) =>
      socket.emit("subscribe", msg)
    );
    tiktokConnectionWrapper.on("follow", (data) => {
      console.log(data.uniqueId, "followed!");
    });
    tiktokConnectionWrapper.on("share", (data) => {
      console.log(data.uniqueId, "shared the stream!");
    });
    //tiktokConnectionWrapper.connection gives you instance of WebcastPushConnection.So,you can use this to get giftlist

    //Here,giftList is array of GiftListDto . View types folder

    //tiktokConnectionWrapper.connection
    //  .getAvailableGifts()
    //  .then((giftList) => {
    //    giftList.forEach((gift) => {
    //      console.log(
    //        `id: ${gift.id}, name: ${gift.name}, cost: ${gift.diamond_count}`
    //      );

    //      socket.emit("giftInfo", {
    //        name: gift.name,
    //        diamond: gift.diamond_count,
    //      });
    //    });
    //  })
    //  .catch((err) => {
    //    console.error(err);
    //  });
  });

  socket.on("disconnect", () => {
    if (tiktokConnectionWrapper) {  
      tiktokConnectionWrapper.disconnect();
    }
  });
});

// Emit global connection statistics
setInterval(() => {
  io.emit("statistic", { globalConnectionCount: getGlobalConnectionCount() });
}, 5000);

// Serve frontend files
app.use("/static", express.static(path.join(__dirname, "/client/build/static")));

app.use("/", express.static(path.join(__dirname, "/client/build")));

app.use(
  cors({
    origin: "*",
  })
);
if (process.env.NODE_ENV === "development") {
  //here morgan is logger middleware for api's
  app.use(morgan("dev"));
}

// Body Parsers
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Start http listener
const port = process.env.PORT || 8081;
httpServer.listen(port);
console.info(`Server running! Please visit http://localhost:${port}`);
