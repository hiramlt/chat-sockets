import { Server } from "socket.io";

const conversation = [
    {
        username: 'coderhouse',
        body: 'bienvenido'
    }
]

let io;

const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', (socketClient) => {
        socketClient.emit('update-conversation', conversation);

        socketClient.on('new-message', (message) => {
            conversation.push(message);
            io.emit('update-conversation', conversation);
        })
    });
}

export default init;