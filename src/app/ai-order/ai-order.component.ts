import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { IInfo, IMessage, IOrder, IFood } from '../commons/talk.interface'
import { WsService } from 'src/services/ws/ws.service';
import { ENUM_WS_LOCATIONS } from '../commons/enum/ws.enum';
declare var $: any;

enum mode{
  debug = "debug",
  demo = "demo",
  product = "product"
}
@Component({
  selector: 'app-ai-order',
  templateUrl: './ai-order.component.html',
  styleUrls: ['./ai-order.component.css']
})
export class AiOrderComponent implements OnInit {
  wsOrder$!: WebSocketSubject<any>;
  /*
  data: IMessage[] = [
    {
      status:'msg',
      from:'AI',
      msg:'歡迎光臨,我是本次服務的AI Waiter',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'請問你要點什麼？',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'我要一份蔥爆牛肉，不要辣',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:' 好的，一份蔥爆牛肉不要辣',
      food:{
        food_img:'',
        meal:'蔥爆牛肉',
        qty:'1',
        price:200,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'再一份招牌豆腐',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'好的，一份招牌豆腐',
      food:{
        food_img:'',
        meal:'招牌豆腐',
        qty:'1',
        price:100,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'然後，一份鳳梨蝦球',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'好的，一份鳳梨蝦球',
      food:{
        food_img:'',
        meal:'鳳梨蝦球',
        qty:'1',
        price:200,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'最後，5碗白飯',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'好的，5碗白飯',
      food:{
        food_img:'',
        meal:'白飯',
        qty:'5',
        price:10,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'這樣就好了',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'AI',
      msg:'我能向您推薦餐點嘛？',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'msg',
      from:'User',
      msg:'好',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },{
      status:'ad',
      from:'',
      msg:'[{xxx},{xxx},{xxx}]',
      food:{
        food_img:'',
        meal:'',
        qty:'',
        price:0,
        option:[],
        reason:'',
      },
      sub_total:0,
    },
  ];                                //消息列表
  */
  ad_data: IOrder[] = [
    {
      meal:'梅干扣肉',
      qty:'1',
      option:[],
      price:200,
      food_img:'',
      reason:'推薦菜單',
    },{
      meal:'椒鹽鱈魚',
      qty:'1',
      option:[],
      price:280,
      food_img:'',
      reason:'原因',
    },{
      meal:'蔥爆牛肉',
      qty:'1',
      option:[],
      price:200,
      food_img:'',
      reason:'原因',
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
    '辣炒板條':'b07',
    '蘿蔔排骨酥麵':'b08',
    '芋頭排骨酥湯':'c01',
    '豆干排骨湯':'c02',
    '貢丸湯':'c03',
    '福菜肉片湯':'c04',
    '酸菜肉片湯':'c05',
    '蘿蔔排骨酥湯':'c06',
    '白斬雞':'d01',
    '咕老肉':'d02',
    '季節時蔬':'d03',
    '招牌豆腐':'d04',
    '炒粉腸':'d05',
    '高麗菜':'d06',
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
  // 咕佬肉、菜埔煎蛋、金桔高麗菜、焢肉飯 更改文字
  foodData:IFood[] =[
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "10000001",
            "goods_name": "客家湯圓",
            "price": 40
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000002",
            "goods_name": "乾麵",
            "price": 55
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000003",
            "goods_name": "客家麵食",
            "price": 55
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000004",
            "goods_name": "麻辣乾拌麵",
            "price": 70
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000005",
            "goods_name": "芋頭排骨酥麵",
            "price": 75
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000006",
            "goods_name": "蘿蔔排骨酥麵",
            "price": 75
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000007",
            "goods_name": "麻辣芋頭排骨酥麵",
            "price": 85
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000008",
            "goods_name": "麻辣蘿蔔排骨酥麵",
            "price": 75
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000009",
            "goods_name": "香炒粄條",
            "price": 75
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000010",
            "goods_name": "辣炒粄條",
            "price": 75
        },
        {
            "category_no": "000001",
            "category_name": "麵類",
            "goods_no": "00000011",
            "goods_name": "麻香牛肉麵",
            "price": 110
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000012",
            "goods_name": "控肉飯",
            "price": 75
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000013",
            "goods_name": "滷肉飯",
            "price": 40
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000014",
            "goods_name": "白飯",
            "price": 10
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000015",
            "goods_name": "麻香乾拌飯",
            "price": 70
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000016",
            "goods_name": "麻香牛肉飯",
            "price": 100
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000059",
            "goods_name": "韭菜水餃",
            "price": 65
        },
        {
            "category_no": "000002",
            "category_name": "飯／水餃",
            "goods_no": "00000060",
            "goods_name": "福菜水餃",
            "price": 65
        },
        {
            "category_no": "000003",
            "category_name": "精選湯品",
            "goods_no": "00000017",
            "goods_name": "貢丸湯",
            "price": 40
        },
        {
            "category_no": "000003",
            "category_name": "精選湯品",
            "goods_no": "00000018",
            "goods_name": "芋頭排骨酥湯",
            "price": 65
        },
        {
            "category_no": "000003",
            "category_name": "精選湯品",
            "goods_no": "00000019",
            "goods_name": "蘿蔔排骨酥湯",
            "price": 65
        },
        {
            "category_no": "000003",
            "category_name": "精選湯品",
            "goods_no": "00000022",
            "goods_name": "福菜肉片湯",
            "price": 150
        },
        {
            "category_no": "000003",
            "category_name": "精選湯品",
            "goods_no": "00000023",
            "goods_name": "豆干排骨湯",
            "price": 150
        },
        {
            "category_no": "000003",
            "category_name": "精選湯品",
            "goods_no": "00000024",
            "goods_name": "酸菜肉片湯",
            "price": 150
        },
        {
            "category_no": "000004",
            "category_name": "大鍋麵",
            "goods_no": "00000025",
            "goods_name": "清香芋頭鍋麵",
            "price": 220
        },
        {
            "category_no": "000004",
            "category_name": "大鍋麵",
            "goods_no": "00000026",
            "goods_name": "清香蘿蔔鍋麵",
            "price": 220
        },
        {
            "category_no": "000004",
            "category_name": "大鍋麵",
            "goods_no": "00000027",
            "goods_name": "客家湯圓鍋",
            "price": 220
        },
        {
            "category_no": "000005",
            "category_name": "滷味拼盤",
            "goods_no": "00000028",
            "goods_name": "川椒滷味拼盤",
            "price": 120
        },
        {
            "category_no": "000005",
            "category_name": "滷味拼盤",
            "goods_no": "00000029",
            "goods_name": "清滷拼盤",
            "price": 100
        },{
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000030",
            "goods_name": "白斬雞",
            "price": 250
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000031",
            "goods_name": "椒鹽鱈魚",
            "price": 250
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000032",
            "goods_name": "麻油松阪豬",
            "price": 250
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000033",
            "goods_name": "紅燒牛腩",
            "price": 300
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000034",
            "goods_name": "梅根扣肉",
            "price": 200
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000035",
            "goods_name": "客家小炒",
            "price": 200
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000036",
            "goods_name": "蔥爆牛肉",
            "price": 200
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000037",
            "goods_name": "鳳梨蝦球",
            "price": 200
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000038",
            "goods_name": "紫蘇鴨",
            "price": 200
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000039",
            "goods_name": "汶爌肉",
            "price": 200
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000040",
            "goods_name": "咕老肉",
            "price": 180
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000041",
            "goods_name": "薑絲炒大腸",
            "price": 180
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000042",
            "goods_name": "鳳梨木耳炒肉絲",
            "price": 180
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000043",
            "goods_name": "炒嘛該",
            "price": 160
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000044",
            "goods_name": "骨肉炒韭菜",
            "price": 160
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000045",
            "goods_name": "客家鹹豬肉",
            "price": 160
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000046",
            "goods_name": "招牌豆腐",
            "price": 100
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000047",
            "goods_name": "橙汁排骨",
            "price": 230
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000048",
            "goods_name": "菜脯煎蛋",
            "price": 100
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000049",
            "goods_name": "塔香煎蛋",
            "price": 100
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000050",
            "goods_name": "高麗菜",
            "price": 100
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000051",
            "goods_name": "季節時蔬",
            "price": 100
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000053",
            "goods_name": "燜筍",
            "price": 80
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000054",
            "goods_name": "麻辣鴨血",
            "price": 50
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000055",
            "goods_name": "麻辣豆腐",
            "price": 50
        },
        {
            "category_no": "000006",
            "category_name": "客家傳香",
            "goods_no": "00000056",
            "goods_name": "綜合麻辣鴨血豆腐",
            "price": 100
        },
        {
            "category_no": "000007",
            "category_name": "特色合菜",
            "goods_no": "00000057",
            "goods_name": "超值和菜",
            "price": 1000
        },
        {
            "category_no": "000007",
            "category_name": "特色合菜",
            "goods_no": "00000058",
            "goods_name": "經濟和菜",
            "price": 2000
        },
        {
            "category_no": "000000",
            "category_name": "特色合菜",
            "goods_no": "00000059",
            "goods_name": "米苔目",
            "price": 60
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000059",
          "goods_name": "辣炒板條",
          "price": 75,
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000060",
          "goods_name": "炒粉腸",
          "price": 100
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000061",
          "goods_name": "炸香菇",
          "price": 100
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000062",
          "goods_name": "紅燒魚",
          "price": 280
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000063",
          "goods_name": "韭菜炒鴨血",
          "price": 200
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000064",
          "goods_name": "香根牛肉",
          "price": 200
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000065",
          "goods_name": "梅干扣肉",
          "price": 200
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000065",
          "goods_name": "椒鹽豬腳",
          "price": 200
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000066",
          "goods_name": "福菜獅子頭",
          "price": 280
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000067",
          "goods_name": "蒜泥腿庫",
          "price": 200
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000068",
          "goods_name": "蒜炒蘿蔔",
          "price": 120
        },{
          "category_no": "000000",
          "category_name": "特色合菜",
          "goods_no": "00000069",
          "goods_name": "酸菜炊豬肚",
          "price": 200
        }
  ]
  
  mode = mode.debug;                //寄送消息
  msg: IMessage;                     //接收temp消息
  messages: IMessage[]=[];           //全部消息
  userInfo: IInfo;                   //user資訊
  userImg: string;                  //user Image
  prev_from : Array<string>=[];     //消息來源
  imgTime : string;                 //圖片時間戳
  firstMeal:number = null;          //第一餐紀錄(index)

  chat :any;
  food_menu: any;            
  tempCart: IOrder = {
    meal: '',
    qty: '',
    option:[],
    price:0,
    food_img:'',
    reason:'',
  };
  myCart: IOrder[]=[];               //目前user加入購物車食物

  sub_total:number = 0;             //food小計
  ad:boolean = false;               //顯示廣告
  ads_food: IOrder[]=[];
  isPhone:boolean = true;          //紀錄Phone鍵
  status:string = this.isPhone ? '請說話接收餐點中...' :  'AI Waiter說話中...' 

  constructor(private router: Router, private wsService:WsService) {
    this.wsService.selectWs(ENUM_WS_LOCATIONS.orderSocket).subscribe( (res) => {
      this.wsOrder$ = res.ws;
    })
  }
  
  ngOnInit() {
    console.log('ai-order init');
    this.myCart = [];
    this.messages =[];
    
    this.chat = document.querySelector(".chatContent .chat");
    this.food_menu = document.querySelector("#exampleModal");
    this.imgTime = new Date().getTime().toString();
    console.log(this.imgTime);
    //get info
    let info = this.getInfoAndCart();
    //subject socket
    info.subscribe((res) => {
      if(res) {
        this.wsOrder$.next("hello"+","+this.userInfo.gender);
        this.wsOrder$.subscribe({
          next: msg => {
            console.log("subject msg received:",msg);

            this.msg = JSON.parse(JSON.stringify(msg));
  
            // 正常訊息(AI、User)
            // if(this.mode==="debug"){
            //   if(this.msg.status === "err"){ return;
            //   this.status = "AI Waiter 說話中..."
            //   this.prev_from.push(this.msg.from);
            //   this.orderApi(this.msg);
            //  }
            // }
            switch (this.msg.status) {
              case "menu":
                this.isPhone = false;
                if(this.msg.msg=="open")
                  $('#exampleModal').modal('show');
                if(this.msg.msg=="close")
                  $('#exampleModal').modal('hide');
                break;

              case "msg":
                if(this.msg.from === "AI"){
                  this.status = "AI Waiter 說話中...";
                }
                console.log($('#exampleModal').css('display'));
                if( $('#exampleModal').css('display') == "block") $('#exampleModal').modal('hide');
                this.prev_from.push(this.msg.from);
                this.orderApi(this.msg);
                break;

              case "end":
                this.order();
                break;

              case "ad":
                if(this.ad===false)this.ad = true;
                let data = JSON.parse(this.msg.msg);
                this.ads_food = JSON.parse(JSON.stringify(data));
                //推薦餐點處理
                this.processAds(this.ads_food);
                break;
              
              case "ready":
                // this.phone();
                this.isPhone = false;
                break;
              
              case "processing":
                this.status = "收到資訊，分析中..."
                this.isPhone = false;
                break;
              
              case "err":
                break;

              default:
                // alert('Error!');
                break;
            }
          }, // Called whenever there is a message from the server.
          error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
          complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
      }
    })
    
  }

  getInfoAndCart():Observable<boolean>{
    return new Observable<boolean>((observer) => {
      // userInfo session check
      let info = sessionStorage.getItem('info');
      this.userInfo = JSON.parse(info);
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
      // Cart session check
      let cart = sessionStorage.getItem('myCart');
      if(cart)
        this.myCart = JSON.parse(cart);

      observer.next(true)
    })
  }

  orderApi(_msg:IMessage){   
    // console.log('messages',this.messages);
    this.tempCart.option = [];
    if(_msg.meal!='' && _msg.meal!='undefined'){
      // 判斷是否有重複
      const result: IOrder = this.myCart.find((item) => item.meal === _msg.meal);
      if(result == null){
        this.tempCart.meal = _msg.meal.toString();
        this.tempCart.qty = _msg.qty.toString();
        this.tempCart.price = this.getPrice(_msg.meal);
        this.myCart.push(JSON.parse(JSON.stringify(this.tempCart)));
      }else{
        result.qty = (parseInt(result.qty) + parseInt(_msg.qty)).toString(); 
      }
      if(this.firstMeal == null) this.firstMeal = this.messages.length ;

      this.sub_total = this.sub_total+this.tempCart.price * parseInt(this.tempCart.qty);
      _msg.price = this.tempCart.price;
      _msg.sub_total = this.sub_total;
      _msg.food_img =  'food_'+this.food[_msg.meal];
    }
    
    this.messages.push(JSON.parse(JSON.stringify(_msg)));
    this.scrollDown();
  }

  processAds(_ads: IOrder[]){
    console.log(_ads,_ads[0]);
    for(let i = 0; i<_ads.length ; i++){
      console.log('meal:',_ads[i].meal,'reason',_ads[i].reason);
    }
    //get image
    _ads.forEach(ad => {
      ad.food_img = 'food_'+ this.food[ad.meal];
      ad.price =this.getPrice(ad.meal);
    });
    this.ads_food = _ads;
    console.log(this.ads_food)
    this.scrollDown();
  }

  getPrice(_meal:string) : number {
    const food:IFood = this.foodData.find(item => item.goods_name === _meal);
    return food.price;
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

  

  /*** 
   *  Btn function
   * ***/

  //手動點餐
  manualOrder(item: IOrder){
    console.log('manual',item);
    this.wsOrder$.next("order," + item.meal);
    this.ads_food = [];
    console.log(this.isPhone);
    this.isPhone = true;
  }
  deleteOrder(_order){
    this.myCart
  }
  menu() {
    // this.ad = true;
    // this.processAds(this.ad_data);
  }
  phone(){
    this.isPhone = true;
    this.status = '請說話，接收餐點中...';
    this.wsOrder$.next('phone');
  }
  //確定點餐
  order() {
    sessionStorage.setItem("myCart",JSON.stringify(this.myCart));
    this.router.navigateByUrl("/ai_check");
  }
  finish(){
    this.wsOrder$.next("finish");
  }
  aiHome(){
    this.wsOrder$.next('stop_talk');
    this.router.navigateByUrl('/ai_home');
    this.wsOrder$.complete();
  }

  /*
  adFood() {
    this.processAds(this.ad_data);
    console.log(this.ad_data)
    this.ad= !this.ad;
    // this.router.navigateByUrl('/home');
  }

  chatData(){
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
  */
}
