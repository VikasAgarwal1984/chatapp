import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatClientComponent } from './chat-client/chat-client.component';
import { MainComponent } from './main/main.component';
import { PlaySocketComponent } from './play-socket/play-socket.component';
import { SockInfoComponent } from './sock-info/sock-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatClientComponent,
    MainComponent,
    PlaySocketComponent,
    SockInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
