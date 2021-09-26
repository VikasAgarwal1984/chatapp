import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatClientComponent } from './chat-client/chat-client.component';
import { MainComponent } from './main/main.component';
import { PlaySocketComponent } from './play-socket/play-socket.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'chat',
    component: ChatClientComponent
  },
  {
    path: 'play',
    component: PlaySocketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
