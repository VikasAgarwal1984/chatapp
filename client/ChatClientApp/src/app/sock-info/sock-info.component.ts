import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SockInfo } from '../models/sock-info';
import { UserMessage } from '../models/user-message';

@Component({
  selector: 'app-sock-info',
  templateUrl: './sock-info.component.html',
  styleUrls: ['./sock-info.component.scss']
})
export class SockInfoComponent {

  @Input()
  sockInfo!: SockInfo;

  @Output()
  connectSocket: EventEmitter<SockInfo> = new EventEmitter();

  @Output()
  disconnectSocket: EventEmitter<SockInfo> = new EventEmitter();

  @Output()
  messageSocket: EventEmitter<UserMessage> = new EventEmitter();

  @Output()
  clearMessagesEvent: EventEmitter<void> = new EventEmitter();

  user = 'All'
  message = '';

  disconnect() {
    if(this.disconnectSocket) {
      this.disconnectSocket.emit(this.sockInfo);
    }
  }

  connect() {
    if(this.connectSocket) {
      this.connectSocket.emit(this.sockInfo);
    }
  }

  sendMessage() {
    if(this.messageSocket) {
      this.messageSocket.emit({user: this.user, message: this.message});
    }
  }

  clearMessages() {
    if(this.clearMessagesEvent) {
      this.clearMessagesEvent.emit();
    }
  }
}
