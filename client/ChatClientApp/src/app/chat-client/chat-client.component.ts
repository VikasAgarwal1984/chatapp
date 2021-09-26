import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat-service.service';

@Component({
  selector: 'app-chat-client',
  templateUrl: './chat-client.component.html',
  styleUrls: ['./chat-client.component.scss']
})
export class ChatClientComponent implements OnInit {

  messages: Array<string> = [];
  message: string = '';
  user: string = '';

  constructor(private cs: ChatService) {
    this.cs.messages.subscribe((x: any) => {
      this.messages.push(`User: ${x.user}, Message: ${x.message}`);
    });
  }

  ngOnInit(): void {
  }
  
  send() {
    this.cs.sendMessage(this.user, this.message);
  }
}
