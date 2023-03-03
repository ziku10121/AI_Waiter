import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  chat_option() {
    $("#content").toggleClass("active1");
    $("#content").removeClass("active2");
  }
  tracking() {
    $("#content").toggleClass("active2");
    $("#content").removeClass("active1");
  }
  chat_widget_body(){
    $(".chat-widget-body").toggleClass("active");
    $("#chat-widget-body").toggleClass("active");
  }

}
