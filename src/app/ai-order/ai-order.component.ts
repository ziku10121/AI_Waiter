import { webSocket } from 'rxjs/webSocket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
declare var bootstrap: any;
interface message{
  status:string,    //訊息狀態(msg, err, end, ad, menu)
  from:string,      //來源(User, AI)
  msg:string,       //訊息
  food_img:string,
  meal:string,      //食物名稱
  option:Array<string>,
  qty:string,       //數量
  price:number,     //價格
  sub_total:number, //小計
};               // 发送的消息内容
interface info{
  age:number,
  gender:string
};               // 发送的消息内容
interface order{
  meal:string,
  option:Array<string>,
  qty:string,
  price:number,
  food_img:string,
};               // 发送的消息内容

@Component({
  selector: 'app-ai-order',
  templateUrl: './ai-order.component.html',
  styleUrls: ['./ai-order.component.css']
})
export class AiOrderComponent implements OnInit {
  subject = webSocket('ws://192.168.1.156:8767/'); //websocket連結
  data: message[] = [
    {
      status:'msg',
      from:'AI',
      msg:'歡迎光臨,我是本次服務的AI Waiter',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'請問你要點什麼？',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'我要一份蔥爆牛肉，不要辣',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:' 好的，一份蔥爆牛肉不要辣',
      food_img:'',
      meal:'蔥爆牛肉',
      option:[],
      qty:'1',
      price:200,
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'再一份招牌豆腐',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'好的，一份招牌豆腐',
      food_img:'',
      meal:'招牌豆腐',
      option:[],
      qty:'1',
      price:100,
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'然後，一份鳳梨蝦球',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'好的，一份鳳梨蝦球',
      food_img:'',
      meal:'鳳梨蝦球',
      option:[],
      qty:'1',
      price:200,
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'最後，5碗白飯',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'好的，5碗白飯',
      food_img:'',
      meal:'白飯',
      option:[],
      qty:'5',
      price:10,
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'這樣就好了',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'我能向您推薦餐點嘛？',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'好',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },{
      status:'ad',
      from:'',
      msg:'[{xxx},{xxx},{xxx}]',
      food_img:'',
      meal:'',
      option:[],
      qty:'',
      price:0,
      sub_total:0,
    },
  ];                                //消息列表
  ad_data: order[] = [
    {
      meal:'梅干扣肉',
      qty:'1',
      option:[],
      price:200,
      food_img:'',
    },{
      meal:'椒鹽鱈魚',
      qty:'1',
      option:[],
      price:280,
      food_img:'',
    },{
      meal:'蔥爆牛肉',
      qty:'1',
      option:[],
      price:200,
      food_img:'',
    }
  ];                                //消息列表
  num :number = 1;                  //暫存data順序

  food:Object={
    // '咕咾肉':'01',
    // '紫蘇鴨':'02',
    // '薑絲大腸':'06',
    '白飯':'a01',
    '控肉飯':'a02',
    '韭菜水餃':'a03',
    '福菜水餃':'a04',
    '滷肉飯':'a05',
    '米苔目':'b01',
    '芋頭排骨酥麵':'b02',
    '客家麵食':'b03',
    '香炒粄條':'b04',
    '乾麵':'b05',
    '麻辣乾拌麵':'b06',
    '辣炒粄條':'b07',
    '蘿蔔排骨酥麵':'b08',
    '芋頭排骨酥湯':'c01',
    '豆干排骨湯':'c02',
    '貢丸湯':'c03',
    '福菜肉片湯':'c04',
    '酸菜肉片湯':'c05',
    '蘿蔔排骨酥湯':'c06',
    '白斬雞':'d01',
    '咕咾肉':'d02',
    '季節時蔬':'d03',
    '招牌豆腐':'d04',
    '炒粉腸':'d05',
    '金桔高麗菜':'d06',
    '客家小炒':'d07',
    '炸香菇':'d08',
    '紅燒魚':'d09',
    '韭菜炒鴨血':'d10',
    '香根牛肉':'d11',
    '骨肉炒韭菜':'d12',
    '梅干扣肉':'d13',
    '椒鹽豬腳':'d14',
    '椒鹽鱈魚':'d15',
    '菜脯煎蛋':'d16',
    '塔香煎蛋':'d17',
    '福菜獅子頭':'d18',
    '蒜泥腿庫':'d19',
    '蒜炒蘿蔔':'d20',
    '酸菜炊豬肚':'d21',
    '鳳梨木耳炒肉絲':'d22',
    '鳳梨蝦球':'d23',
    '蔥爆牛肉':'d24',
    '薑絲炒大腸':'d25',
    '蘿蔔炊排骨':'d26',
  };                                //菜名對應圖片
  price:Object={
    '白飯':'10',
    '控肉飯':'80',
    '韭菜水餃':'65',
    '福菜水餃':'65',
    '滷肉飯':'50',
    '米苔目':'60',
    '芋頭排骨酥麵':'85',
    '客家麵食':'55',
    '香炒粄條':'75',
    '乾麵':'55',
    '麻辣乾拌麵':'55',
    '辣炒粄條':'75',
    '蘿蔔排骨酥麵':'85',
    '芋頭排骨酥湯':'70',
    '豆干排骨湯':'70',
    '貢丸湯':'45',
    '福菜肉片湯':'160',
    '酸菜肉片湯':'160',
    '蘿蔔排骨酥湯':'70',
    '白斬雞':'300',
    '咕咾肉':'200',
    '季節時蔬':'120',
    '招牌豆腐':'110',
    '炒粉腸':'100',
    '金桔高麗菜':'120',
    '客家小炒':'220',
    '炸香菇':'100',
    '紅燒魚':'280',
    '韭菜炒鴨血':'200',
    '香根牛肉':'200',
    '骨肉炒韭菜':'170',
    '梅干扣肉':'200',
    '椒鹽豬腳':'170',
    '椒鹽鱈魚':'280',
    '菜脯煎蛋':'120',
    '塔香煎蛋':'120',
    '福菜獅子頭':'280',
    '蒜泥腿庫':'200',
    '蒜炒蘿蔔':'120',
    '酸菜炊豬肚':'200',
    '鳳梨木耳炒肉絲':'100',
    '鳳梨蝦球':'220',
    '蔥爆牛肉':'220',
    '薑絲炒大腸':'200',
    '蘿蔔炊排骨':'200',
  }
  
  sendmsg = "hello";                //寄送消息
  msg: message;                     //接收temp消息
  messages: message[]=[];           //全部消息
  userInfo: info;                   //user資訊
  userImg: string;                  //user Image
  prev_from : Array<string>=[];     //消息來源

  chat :any;            
  tempCart: order = {
    meal: '',
    qty: '',
    option:[],
    price:0,
    food_img:'',
  };
  myCart: order[]=[];               //目前user加入購物車食物

  sub_total:number = 0;             //food小計
  ad:boolean = false;               //顯示廣告
  ads_food:order[]=[];
  isPhone:boolean = false;          //紀錄Phone鍵
  status:string = this.isPhone ? '請說話接收餐點中...' :  'AI Waiter說話中...' 

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.myCart = [];
    this.messages =[];
    //get info
    this.getInfo();

    let t = setTimeout(() => {
      
      clearTimeout(t)
    }, 1000);

    //subject socket
    this.subject.next(this.sendmsg+","+this.userInfo.gender);
    this.chat = document.querySelector(".chatContent .chat");
    this.subject.subscribe({
      next: msg => {
        console.log("subject msg:",msg);
        // console.log('message received: ' + JSON.stringify(msg));
        this.msg = JSON.parse(JSON.stringify(msg));

        // 正常訊息(AI、User)
        if(this.msg.status === "msg") {
          this.status = "AI Waiter 說話中..."
          this.prev_from.push(this.msg.from);
          this.orderApi(this.msg);
        }
        // 結帳
        if(this.msg.status === "end")
        {
          sessionStorage.setItem("myCart",JSON.stringify(this.myCart));
          this.router.navigateByUrl("/ai_check");
        }
        // 推薦菜單
        if(this.msg.status === "ad"){
          if(this.ad===false)this.ad = true;
          this.ads_food = JSON.parse(JSON.stringify(this.msg));
          this.processAds(this.ads_food);
        }
        
        return;
        // 得知Waiter語音完，傳送狀態開始點餐
        this.status = "請說話，接收餐點中..."
        this.isPhone = true;
        // 收到User訊息，分析狀態
        this.status = "收到資訊，分析中..."
        this.isPhone = false;
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });

  }

  getInfo(){
    let info = sessionStorage.getItem('info');
    this.userInfo = JSON.parse(info);
    if(this.userInfo === null || this.userInfo === undefined)
      this.router.navigateByUrl('/ai_home');
    if(this.userInfo.age < 0){
      //預設圖片
      this.userImg = "1_10_boy.jpg";
    }
    else if(this.userInfo.age >= 1 && this.userInfo.age < 11){
      this.userInfo.gender==='Male'? this.userImg = "1_10_girl.jpg" : this.userImg="1_10_boy.jpg";
    }
    else if(this.userInfo.age >= 11 && this.userInfo.age < 50){
      this.userInfo.gender==='Male'? this.userImg = "11_50_girl.jpg" : this.userImg="11_50_boy.jpg";
    }
    else if(this.userInfo.age >= 50){
      this.userInfo.gender==='Male'? this.userImg = "51_girl.jpg" : this.userImg="51_boy.jpg";
    }
  }

  menu() {
  }
  phone(){
    this.isPhone = !this.isPhone;
    this.status = '請說話，接收餐點中...'
    console.log('phone');
    this.subject.next('phone');
  }

  chatData(){
    this.isPhone = !this.isPhone;
    if(this.data.length<this.num)return;
    if(this.num == this.data.length){
      sessionStorage.setItem('myCart',JSON.stringify(this.myCart));
      this.router.navigateByUrl('/ai_check');
      return;
    }
    //Test
    // this.messages.push(this.data[this.num]);
    console.log(this.data[this.num].status)
    if(this.data[this.num].status === 'ad') {
      this.processAds(this.ad_data);
      //Add
      this.num++;
      return;
    }
    // 每筆消息塞進消息來源
    this.prev_from.push(this.data[this.num].from.toString());
    
    if(this.data[this.num].status === 'msg')this.messages.push(this.data[this.num]);
    if(this.messages[this.num].meal!='' && this.messages[this.num].meal!=undefined){
      this.tempCart.meal = this.messages[this.num].meal.toString();
      this.tempCart.qty = this.messages[this.num].qty.toString();
      this.tempCart.price = parseInt(this.price[this.messages[this.num].meal]);
      
      this.sub_total = this.sub_total+this.tempCart.price * parseInt(this.tempCart.qty);
      this.messages[this.num].sub_total = this.sub_total;
      this.messages[this.num].food_img =  'food_'+this.food[this.messages[this.num].meal];
      console.log(this.messages);

      this.myCart.push(JSON.parse(JSON.stringify(this.tempCart)));
    }
    
    //Add
    this.num++;

    //Bottom Scroll
    setTimeout(() => {
      this.chat.scrollTo({
        top:this.chat.scrollHeight,
        behavior:'smooth'
      });
    }, 100);
    console.log(this.myCart.length);
  }
  
  orderApi(_msg:message){
    
    // console.log('messages',this.messages);
    // if(_msg.status === "ad") this.processAds(this.ad_data);
    // if(_msg.status === "msg")
    // console.log('msg',_msg,'megss',this.messages);
    this.tempCart.option = [];
    if(_msg.meal!='' && _msg.meal!='undefined'){
      this.tempCart.meal = _msg.meal.toString();
      this.tempCart.qty = _msg.qty.toString();
      this.tempCart.price = parseInt(this.price[_msg.meal]);
      // console.log(this.tempCart);
      this.sub_total = this.sub_total+this.tempCart.price * parseInt(this.tempCart.qty);
      _msg.sub_total = this.sub_total;
      _msg.food_img =  'food_'+this.food[_msg.meal];
      // console.log(_msg);
      
      this.myCart.push(JSON.parse(JSON.stringify(this.tempCart)));
    }
    this.messages.push(JSON.parse(JSON.stringify(_msg)));
    this.scrollDown();
  }

  processAds(_ads:order[]){
    //get image
    _ads.forEach(ad => {
      ad.food_img = 'food_'+ this.food[ad.meal];
    });
    this.ads_food = _ads;
    this.scrollDown();
  }

  scrollDown(){
    //Bottom Scroll
    setTimeout(() => {
      this.chat.scrollTo({
        top:this.chat.scrollHeight,
        behavior:'smooth'
      });
    }, 100);
  }

  adFood() {
    this.processAds(this.ad_data);
    console.log(this.ad_data)
    this.ad= !this.ad;
    // this.router.navigateByUrl('/home');
  }

  aiHome(){
    this.router.navigateByUrl('/ai_home');
  }
}
