import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as internal from 'stream';
import { ItemsComponent } from '../items/items.component';

declare var $: any;
interface order{
  meal:string
  qty:string,
  price:number,
  total:number,
};               // 发送的消息内容

interface oAuth{
  key:string,
  secret:string,
  algorithm:any,
}

interface product{
  id:number,
  name:string,
  price:string,
  regular_price:string,
  status:string,        //產品狀態
}
interface shipping{
  total:string,
  total_tax:string,
}
// interface bill{
//   payment_method:string,
//   payment_method_title:string,
//   set_paid:boolean,
//   billing:any,
//   shipping:any,
//   line_items:Array<line>,
//   shipping_line:Array<any>
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ip='192.168.0.103';
  method='products';
  getUrl=`http://${this.ip}/alanhsu/get_many.php?type=`
  postOrderUrl=`http://${this.ip}/alanhsu/create.php?type=orders`
  categories:any[] =[];
  products:any[] =[];
  tempProducts:any[] =[];
  myCart: any[]=[];
  
  filter_text:string='';
  sub_total:number=0;
  tax:number=0;
  other_charge:number=0;
  amount_to_Pay:number=0;

  food:Object={
    // '咕咾肉':'01',
    // '紫蘇鴨':'02',
    // '薑絲大腸':'06',
    '貢丸湯':'01',
    '麻油松阪豬':'02',
    '客家小炒':'03',
    '招牌豆腐':'04',
    '蔥爆牛肉':'05',
    '椒鹽鱈魚':'06',
    '鳳梨蝦球':'07',
    '客家鹹豬肉':'08',
    '骨肉炒韭菜':'09',
    '白飯':'10',
    '水餃':'11',
    '梅干扣肉':'12'
  };    

  bill = {
    "payment_method": "bacs",
    "payment_method_title": "Direct Bank Transfer",
    "set_paid": true,
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "969 Market",
      "address_2": "",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US",
      "email": "john.doe@example.com",
      "phone": "(555) 555-5555"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "969 Market",
      "address_2": "",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US"
    },
    "line_items": [],
    "shipping_lines": [
      {
        "method_id": "flat_rate",
        "method_title": "Flat Rate",
        "total": "10.00"
      }
    ]
  }
  mybill:object;
  constructor() { 
  }
  
  async ngOnInit(): Promise<void> {
    console.log('ngOnInit');

    if(sessionStorage.getItem('product')){
      this.products = JSON.parse(sessionStorage.getItem('product')); } 
    else{
      this.products = await this.getAll('products');
      sessionStorage.setItem('product',JSON.stringify(this.products)); 
    }

    if(sessionStorage.getItem('category'))
      this.categories = JSON.parse(sessionStorage.getItem('category'));
    else{
      this.categories = await this.getAll('categories');
      sessionStorage.setItem('category',JSON.stringify(this.categories)); 
    }
    
    this.tempProducts = JSON.parse(JSON.stringify(this.products));
    console.log('temp P',this.tempProducts)
    console.log('start');
  }
  ngAfterViewInit() {
    console.log("ngOnViewInit");
    // this.wow.init()
    // setTimeout(() => new WOW().init(), 1000);

    // $('.owl-carousel').owlCarousel({
    //   loop: false,
    //   margin: 20,
    //   nav: false,
    //   dot: false,
    //   responsive: {
    //     0: {
    //       items: 2
    //     },
    //     600: {
    //       items: 4
    //     },
    //     1200: {
    //       items: 8
    //     }
    //   }
    // });
    $("#cancel_order").on("click", function () {
      $("#no-order").toggleClass("active");
      $("#item_list").removeClass("active");
    });
    $("#add_order").on("click", function () {
      $("#item_list").toggleClass("active");
      $("#no-order").removeClass("active");
    });
    $("#place-order").on("click", function () {
      $("#amount_to_Pay").toggleClass("active");
      $("#item_list").removeClass("active");
    });
    $("#edit_order").on("click", function () {
      $("#item_list").toggleClass("active");
      $("#amount_to_Pay").removeClass("active");
    });
    $("#submit").on("click", function () {
      $("#no-order").toggleClass("active");
      $("#amount_to_Pay").removeClass("active");
    });
    $("#menu").on("click", function () {
      $("#header").toggleClass("active");
    });
  }

  getAll(_method:string){
    try{
      return axios.get(this.getUrl+_method)
      .then((res)=>{
        // console.log(`axios ${_method} from php:\n`,res.data);
        let data = res.data;

        if(_method==='products'){
          data.forEach((item) => {
            item.img_name = 'food_'+this.food[item.name]+'.jpg';
          });
        }
        return data;
      })
    }
    catch(err){
      console.log(err);
    }
  } 

  filterBtn(category:string,e:Event){
    const target = e.target as Element;
    let orderReady = document.querySelector('.nav.nav-tabs.owl-carousel').childNodes;
    //clear all categories have active 
    orderReady.forEach((item:Element)=>{
      if(item.className===undefined||item.className===null) return
      if(item.className.indexOf('active') > -1){
        item.classList.remove("active");
      }
    })
    //add active class on click button
    target.classList.add("active");

    
    this.tempProducts = [];
    //all products
    if(category==='All'){
      this.tempProducts = JSON.parse(JSON.stringify(this.products));
      return;
    }
    //filter products
    let result = this.products.filter((item)=> {
      return item.categories[0].name === category;
    });
    if(result)
      this.tempProducts = JSON.parse(JSON.stringify(result));
  }

  filterTxt(){
    this.tempProducts = [];
    console.log(this.filter_text);
    let result = this.products.filter((item)=> {
      return item.name.includes(this.filter_text);
    });
    console.log(result);
    if(result)
      this.tempProducts = JSON.parse(JSON.stringify(result));

    this.filter_text='';
  }

  addCart(_item:any){
    let orderReady = document.getElementById('item_list').className.indexOf('active') > -1;
    if(!orderReady && _item==='null'){
      this.myCart.forEach((item)=>{
        item.qty=0;
      })
      this.myCart = [];
      console.log('clear my cart');
      return;
    }

    let result = this.myCart.filter((item)=>item.name === _item.name);
    _item.qty ? _item.qty++ : _item.qty=1;
    _item.total = _item.price * _item.qty;

    if(result.length == 0)this.myCart.push(_item);
    this.count('plus', _item.price);
    // console.log('mmCart',this.myCart);
  }

  plusCart(_item:any){
    _item.qty++ ;
    this.count('plus', _item.price);
  }

  minCart(_item:any){
    _item.qty-- ;
    this.myCart.forEach( (item, index) => {
      if(item.qty===0) this.myCart.splice(index,1);
    });
    this.count('sub',_item.price);
  }

  count(method:string, _price:number){
    method==='plus' ? this.sub_total += parseInt(_price.toString()) : this.sub_total -= parseInt(_price.toString());
    
    this.tax=Math.round(this.sub_total*0.1);
    this.amount_to_Pay=this.sub_total+this.tax;
  }

  postOrder(){
    this.mybill={};
    this.myCart.forEach((item)=>{
      let line ={
        product_id:'',
        variation_id:'',
        quantity:'',
      }
      console.log(item.id);
      line.product_id = item.id;
      line.variation_id = item.id;
      line.quantity = item.qty;
      this.bill.line_items.push(line);
    });
    this.mybill = JSON.parse(JSON.stringify(this.bill));

    axios.post(this.postOrderUrl,this.bill)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
    // 清空菜單
    this.bill.line_items=[];
    console.log('BILL：\n',this.bill);
  }
}
