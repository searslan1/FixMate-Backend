import express from 'express';
import cors from 'cors';
import router from './index';
import { errorHandler } from './middlewares/errorHandler';
import http from 'http';
import { startSocketServer } from './websocket/socketServer';



const app = express();
const server = http.createServer(app);

startSocketServer(server); // 🔥 WebSocket server başlat


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

//Global Error Handler
app.use(errorHandler);

// Server Başlat
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
