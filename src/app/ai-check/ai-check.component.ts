import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WsService } from 'src/services/ws/ws.service';
import { ENUM_WS_LOCATIONS } from 'src/app/commons/enum/ws.enum';
import axios from 'axios';
import { Observable } from 'rxjs';
import { IBill } from '../commons/span.interface';

declare var $: any;
interface order{
  meal:string
  qty:string,
  price:number,
  total:number,
};               // 发送的消息内容
@Component({
  selector: 'app-ai-check',
  templateUrl: './ai-check.component.html',
  styleUrls: ['./ai-check.component.css']
})
export class AiCheckComponent implements OnInit {
  wsOrder$ !:WebSocketSubject<any>;
  wsCommand$ !:WebSocketSubject<any>;
  myCart: order[]=[];
  amount_to_Pay:number=0;
  local_url ="http://localhost:9999/printer?method=1";
  printer:IBill = {
    company : "",
    branch : "",
    address : "",
    phone : "",
    carrier : "",
    total : "",
    pay: "",
    items : []
  }
  dialog_txt:String ='';
  print_time:Number = 5;
  isPrint:boolean;

  constructor(private router: Router, private wsService:WsService) { 
    this.wsOrder$ = this.wsService.getWs(ENUM_WS_LOCATIONS.orderSocket);
    this.wsCommand$ = this.wsService.getWs(ENUM_WS_LOCATIONS.commandSocket);
  }
  ngOnInit(): void {
    this.print_time = 5;
    this.dialog_txt = '列印中(' + this.print_time +')';
    this.getMyCart().subscribe( (res) => {
      if(res) {
        console.log(sessionStorage.getItem('myCart'))
        this.wsCommand$.next("cashout," + JSON.stringify(sessionStorage.getItem('myCart')));
      }
    });
  }
  getMyCart():Observable<boolean>{
    return new Observable<boolean>((observer) => {
      let cart = sessionStorage.getItem('myCart');
      if(cart == ''||cart=='undefined') 
        observer.next(false);

      this.myCart = JSON.parse(cart).items;
      this.amount_to_Pay = JSON.parse(cart).amount_to_Pay;

      observer.next(true);
    })
  }

  processPrint(){
    this.printer.company = "公館麵店";
    this.printer.branch = "公館麵店";
    this.printer.address = "苗栗縣公館鄉仁愛路二段168-1號";
    this.printer.phone = "03-7234658";
    this.printer.carrier = "ABC123";
    this.printer.total = this.amount_to_Pay.toString();
    this.printer.pay = this.amount_to_Pay.toString();
    this.myCart.forEach( item => {
      this.printer.items.push({
        "name":item.meal,
        "subtotal":item.total.toString(),
        "qty":item.qty.toString(),
      })
    });

    axios.post(this.local_url, this.printer)
    .then( (res) => {
      this.isPrint = true;
      this.setTimer();
      console.log(res);
    })
    .catch((err)=>{
      this.isPrint = false;
      this.isPrint = true;
      // this.dialog_txt = '列印錯誤';
      this.setTimer();
      console.log(err)
    });
  } 

  setTimer() {
    const timer = setInterval(function(){
      if(this.print_time < 0){
        this.router.navigateByUrl("/ai_home");
        this.wsOrder$.next('stop_talk');
        this.wsOrder$.complete();
        this.wsCommand$.complete();
        clearInterval(timer);
      } 
      this.dialog_txt = '列印中(' + this.print_time +')';
      this.print_time-=1;
    }.bind(this), 1000);
  }
  cancel(){
    // 停止聲音
    this.router.navigateByUrl('/ai_home');
    this.wsOrder$.next('stop_talk');
    this.wsOrder$.complete();
    this.wsCommand$.complete();
  }
  // 結帳
  order(){
    this.processPrint();
  }
  // 回上一頁
  backOrder(){
    console.log(this.wsOrder$);
    this.getWs();
    this.wsOrder$.next('stop_talk');
    this.wsOrder$.complete();
    this.wsCommand$.complete();
    this.router.navigateByUrl('/ai_order');
  }

  getWs(){
    if(!this.wsOrder$)
      this.wsOrder$ = this.wsService.getWs(ENUM_WS_LOCATIONS.orderSocket);
    if(!this.wsCommand$)
      this.wsCommand$ = this.wsService.getWs(ENUM_WS_LOCATIONS.commandSocket);
  }
}
