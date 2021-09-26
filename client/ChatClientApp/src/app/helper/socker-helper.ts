import { SockInfo } from "../models/sock-info";
import { UserMessage } from "../models/user-message";

export class SocketHelper {

    private socket!: WebSocket;
    private static id = 0;
    public sockInfo: SockInfo;
    private server: string;

    constructor(svr: string) {
        this.server = svr;
        SocketHelper.id++;

        this.sockInfo = new SockInfo();
        this.sockInfo.name = "Connection-" + SocketHelper.id;
        this.sockInfo.isConnected = false;
        this.sockInfo.messages = [];
    }

    connect() {
        this.socket = new WebSocket(this.server);
        this.socket.addEventListener('open', this.onOpen.bind(this));
        this.socket.addEventListener('close', this.onClose.bind(this));
        this.socket.addEventListener('message', this.onMessageReceived.bind(this));
    }

    disconnect() {
        this.socket.close();
    }

    private endChar = String.fromCharCode(30);

    private handhsakeWithServer() {
        let mm = `{"protocol":"json","version":1}${this.endChar}`;
        this.socket.send(mm);
    }

    sendMessage(msg: UserMessage) {
        let m1 = `{"arguments":["${msg.user}","${msg.message}"],"target":"SendMessage","type":1}${this.endChar}`;
        //let u = JSON.stringify(m1);
        //let m2 = `{"arguments":["sds","dsds"],"target":"SendMessage","type":1}${endChar}`;
        this.socket.send(m1);
    }

    onMessageReceived(event: any) {
        this.sockInfo.messages.push(event.data)
        console.log('Message from server ', event.data);
    }

    private onOpen(event: any) {
        this.sockInfo.isConnected = true;
        this.handhsakeWithServer();
    }
 
    private onClose() {
        this.sockInfo.isConnected = false;
    }
}