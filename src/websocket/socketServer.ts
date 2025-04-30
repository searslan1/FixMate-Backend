import WebSocket, { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { prisma } from '../config/database';
import { JWT_SECRET } from '../config/env';

const clients = new Map<number, WebSocket>(); // userId → socket

export function startSocketServer(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws: WebSocket, req: IncomingMessage) => {
    const token = getTokenFromRequest(req);

    if (!token) {
      ws.close();
      return;
    }

    let userId: number;

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      clients.set(userId, ws);
      console.log(`✅ WS connected: User ${userId}`);
    } catch (err) {
      ws.close();
      return;
    }

    ws.on('message', async (message) => {
      try {
        const parsed = JSON.parse(message.toString());
        const { to, text } = parsed;

        if (!to || !text) return;

        // Mesajı DB’ye kaydet
        await prisma.chat.create({
          data: {
            senderId: userId,
            receiverId: to,
            message: text,
          },
        });

        // Alıcı online ise anlık gönder
        const receiverWs = clients.get(to);
        if (receiverWs && receiverWs.readyState === WebSocket.OPEN) {
          receiverWs.send(JSON.stringify({
            from: userId,
            text,
            createdAt: new Date().toISOString(),
          }));
        }
      } catch (err) {
        console.error('❌ WS message error:', err);
      }
    });

    ws.on('close', () => {
      clients.delete(userId);
      console.log(`⛔️ WS disconnected: User ${userId}`);
    });
  });
}
export function sendNotificationToUser(userId: number, notification: any) {
  const ws = clients.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'notification',
      data: notification,
    }));
  }
}


function getTokenFromRequest(req: IncomingMessage): string | null {
  const authHeader = req.headers['sec-websocket-protocol'];
  if (!authHeader) return null;
  const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  return token;
}
