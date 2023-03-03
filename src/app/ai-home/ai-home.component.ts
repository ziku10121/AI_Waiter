import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-ai-home',
  templateUrl: './ai-home.component.html',
  styleUrls: ['./ai-home.component.css']
})
export class AiHomeComponent implements OnInit {
  subject = webSocket('ws://192.168.1.156:8766/');
  
  ready:boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.subject.subscribe({
      next: (msg) => {
        console.log('message received: ' + msg);
        if(JSON.stringify(msg)!= ''){
          console.log(JSON.stringify(msg));
          sessionStorage.setItem('info',JSON.stringify(msg));
          this.router.navigateByUrl('/ai_order');
        }
        else{
          console.error('錯誤');
        }
      }, // Called whenever there is a message from the server.
      error: err => {
        this.ready = false;
        alert('系統錯誤');
        console.log('xx',err);
      }, // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  start1() {
    this.ready = true;
    // sessionStorage.setItem('info',JSON.stringify({"gender":"Female","age":10}));
    // this.router.navigateByUrl('/ai_order');
    this.subject.next("photo");
  }
  start2() {
    this.ready = true;
    sessionStorage.setItem('info',JSON.stringify({"gender":"Male","age":25}));
    this.router.navigateByUrl('/ai_order');
    // this.subject.next('photo');
  }
}
