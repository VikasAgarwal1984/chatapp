import { Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnDestroy {
  private readonly connection: HubConnection;

  private readonly messagesSub: Subject<any>;
  public readonly messages: Observable<any>;

  constructor() {
    this.messagesSub = new Subject<any>();
    this.messages = this.messagesSub.asObservable();
    this.connection = new HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').build();
    this.connection.start().then((x) => {
      console.log('Connection', x);
    });
    this.listenForMessages();
  }

  private listenForMessages() {
    this.connection.on("ReceiveMessage", (user, message) => {
      this.messagesSub.next({user, message});
  });
  }

  ngOnDestroy(): void {
    this.connection.stop();
  }

  sendMessage(user: string, message: string) {
    this.connection.invoke('SendMessage', user, message).catch(function (err) {
      return console.error(err.toString());
    });
  }
}
