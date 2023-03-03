import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  opening() {
    $('#opening-time').datetimepicker({
      datepicker: false,
      dateFormat: false,
      pickDate: false,
      timeFormat: 'hh:mm',
      timeOnly: true,
    });
  }
  closing() {
    $('#closing-time').datetimepicker({
      datepicker: false,
      dateFormat: false,
      pickDate: false,
      timeFormat: 'hh:mm',
      timeOnly: true,
    });
  }
}
