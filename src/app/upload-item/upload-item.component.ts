import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.css']
})
export class UploadItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#datetime").datetimepicker();

    $(".tokenizer").select2({
        tags: true,
        tokenSeparators: [',', ' ']
    })
  }
  addmore(){
      $('#showmore').append('<div class="row"><div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7"><div class="form-group"><input type="text" class="form-control" placeholder="Add option" required=""></div></div><div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5"><div class="form-group"><input type="text" class="form-control" placeholder="Add price" required=""></div></div></div>')
  }
}
