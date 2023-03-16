import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
// import { ITalk } from '../common/talk.interface';

@Injectable({
  providedIn: 'root'
})
export class TalkService {
  photoSocket = webSocket('ws://192.168.1.156:8766/');
  orderSocket = webSocket('ws://192.168.1.156:8767/');
  socket = new WebSocket('ws://192.168.1.156:8766/');
  
  constructor() {}
  
  connectCamera(){
    this.photoSocket.subscribe();
  }

  closeCamera(){
    this.photoSocket.complete();
    this.photoSocket.unsubscribe();
  }

  takePhoto(){
    console.log('takePhoto');
    this.photoSocket.next("photo");
  }

  startWatch():string {
    this.photoSocket.subscribe({
      next: (msg) => {
        console.log('message received: ' + msg);
        if(JSON.stringify(msg)!= ''){
          console.log(JSON.stringify(msg));
          sessionStorage.setItem('info',JSON.stringify(msg));
          return "success"
        }
        else{
          return "error"
        }
      }
    });
    return'';
    // return new Observable<boolean>((observer) => {
    //   observer
    // })
  }

  observer = {
    next: (msg) => {
      console.log('message received: ' + msg);
      if(JSON.stringify(msg)!= ''){
        console.log(JSON.stringify(msg));
        sessionStorage.setItem('info',JSON.stringify(msg));
      }
      else{
        console.error('錯誤');
      }
    }, // Called whenever there is a message from the server.
    error: err => {
      // this.ready = false;
      alert('系統錯誤');
      console.log('xx',err);
    }, // Called if at any point WebSocket API signals some kind of error.
    complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
  }


}
