import { Component, OnInit } from '@angular/core';
import { SocketHelper } from '../helper/socker-helper';
import { SockInfo } from '../models/sock-info';
import { UserMessage } from '../models/user-message';

@Component({
  selector: 'app-play-socket',
  templateUrl: './play-socket.component.html',
  styleUrls: ['./play-socket.component.scss']
})
export class PlaySocketComponent {
  numberOfConnections: number = 10;
  serverName: string = 'ws://localhost:5000/chatHub';

  public connections: Array<SocketHelper> = [];

  addNewConnections() {
    for(let i=0;i<this.numberOfConnections;i++) {
      this.connections.push(this.getSocket());
    }
  }

  getSocket(): SocketHelper {
    const so = new SocketHelper(this.serverName);
    return so;
  }

  disconnectAll() {
    this.connections.filter(x => x.sockInfo.isConnected).forEach(y => y.disconnect());

  }

  connectAll() {
    this.connections.filter(x => !x.sockInfo.isConnected).forEach(y => y.connect());
  }

  disconnectSocket($event: SockInfo) {
    this.connections.find(x => x.sockInfo == $event)?.disconnect();
  }

  messageSocket(so: SockInfo, msg: UserMessage) {
    this.connections.find(x => x.sockInfo == so)?.sendMessage(msg);

  }

  connectSocket($event: SockInfo) {
    this.connections.find(x => x.sockInfo == $event)?.connect();
  }

  clearMessages($event: SockInfo) {
    $event.messages = [];
  }
}
