import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';
import { IInfo } from '../../common/talk.interface';
import { TalkService } from '../../services/talk.service';

@Component({
  selector: 'app-ai-home',
  templateUrl: './ai-home.component.html',
  styleUrls: ['./ai-home.component.css']
})
export class AiHomeComponent implements OnInit {
  subject = webSocket('ws://192.168.1.156:8766/');

  ready:boolean = false;
  constructor(
    private router: Router,
    private talkService:TalkService) {
      
    }

  ngOnInit(): void {
    // let take = this.talkService.startWatch();
    // this.talkService.startWatch((res) =>{

    // })
    // this.talkService.startWatch();
    // sessionStorage.clear();
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
      }, // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  start1() {
    this.ready = true;
    this.subject.next("photo");
  }
  start2() {
    this.ready = true;
    this.talkService.takePhoto();
    // sessionStorage.setItem('info',JSON.stringify({"gender":"Male","age":25}));
    // this.router.navigateByUrl('/ai_order');
  }
}
