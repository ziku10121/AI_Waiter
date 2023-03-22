import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WsService } from 'src/services/ws/ws.service';
import { ENUM_WS_LOCATIONS } from '../commons/enum/ws.enum';

@Component({
  selector: 'app-ai-home',
  templateUrl: './ai-home.component.html',
  styleUrls: ['./ai-home.component.css']
})
export class AiHomeComponent implements OnInit {
  
  wsPhoto$!: WebSocketSubject<any>;
  ready:boolean = false;
  ws$ = webSocket('ws://192.168.1.156:8766');

  constructor(private router: Router,private wsService:WsService) {
    this.wsService.selectWs(ENUM_WS_LOCATIONS.photoSocket).subscribe((result) => {
      this.wsPhoto$ = result.ws;
    })

    // this.wsPhoto$ = this.wsService.selectWs(ENUM_WS_LOCATIONS.photoSocket)

    // this.wsService.selectWs(ENUM_WS_LOCATIONS.photoSocket).subscribe((result) => {
    //   console.log('result')
    //   this.wsPhoto$ = result.ws
    // })
  }



  ngOnInit(): void {
    this.clearSession();
    this.wsPhoto$.subscribe(
      (msg)=>{
        console.log('message received: ' + msg);
        if(JSON.stringify(msg)!= ''){
          console.log(JSON.stringify(msg));
          sessionStorage.setItem('info',JSON.stringify(msg));
          this.router.navigateByUrl('/ai_order');
          this.wsPhoto$.complete();
        }
        else{
          console.error('錯誤');
        }
      },
      (err)=>{
        this.ready = false;
        alert('系統錯誤');
      },
      () => {}
    )
  }

  clearSession(){
    sessionStorage.clear();
  }

  start1() {
    this.ready = true;
    this.wsPhoto$.next("photo");
  }
  start2() {
    this.ready = true;
    // this.wsPhoto$.next('photo');
    // sessionStorage.setItem('info',JSON.stringify({"gender":"Male","age":25}));
    // this.router.navigateByUrl('/ai_order');
  }
}
