import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { ITalk } from '../app/common/talk.interface';

@Injectable({
  providedIn: 'root'
})
export class TalkService {
  // subject = webSocket('ws://192.168.1.156:8766/');
  // constructor() {
    
  // }

  // startWatch(): Observable<ITalk> {
  //   return new Observable<ITalk>((observer) => {
  //     this.subject.next("photo");
  //     this.subject.subscribe(observer);
  //     // observer.next(any)
  //   })
  // }

  // observer = {
  //   next: (msg) => {
  //     console.log('message received: ' + msg);
  //     if(JSON.stringify(msg)!= ''){
  //       console.log(JSON.stringify(msg));
  //       sessionStorage.setItem('info',JSON.stringify(msg));
  //     }
  //     else{
  //       console.error('錯誤');
  //     }
  //   }, // Called whenever there is a message from the server.
  //   error: err => {
  //     // this.ready = false;
  //     alert('系統錯誤');
  //     console.log('xx',err);
  //   }, // Called if at any point WebSocket API signals some kind of error.
  //   complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
  // }


}
