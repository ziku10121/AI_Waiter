import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupedObservable, observable, Observable } from 'rxjs';
import { IInfo, IMessage, IOrder, IFood, Enum_PHONE_Mode } from '../commons/talk.interface'
import { WsService } from 'src/services/ws/ws.service';
import { ENUM_WS_LOCATIONS } from '../commons/enum/ws.enum';
import { ICart } from '../commons/cart.interface';
declare var $: any;

enum mode {
  debug = "debug",
  product = "product"
}

@Component({
  selector: 'app-ai-order',
  templateUrl: './ai-order.component.html',
  styleUrls: ['./ai-order.component.css']
})
export class AiOrderComponent implements OnInit {
  food: Object = {
    // '咕咾肉':'01',
    // '紫蘇鴨':'02',
    // '薑絲大腸':'06',
    '白飯': 'a01',
    '控肉飯': 'a02',
    '韭菜水餃': 'a03',
    '福菜水餃': 'a04',
    '滷肉飯': 'a05',
    '米苔目': 'b01',
    '芋頭排骨酥麵': 'b02',
    '客家麵食': 'b03',
    '香炒粄條': 'b04',
    '乾麵': 'b05',
    '麻辣乾拌麵': 'b06',
    '辣炒板條': 'b07',
    '蘿蔔排骨酥麵': 'b08',
    '芋頭排骨酥湯': 'c01',
    '豆干排骨湯': 'c02',
    '貢丸湯': 'c03',
    '福菜肉片湯': 'c04',
    '酸菜肉片湯': 'c05',
    '蘿蔔排骨酥湯': 'c06',
    '白斬雞': 'd01',
    '咕老肉': 'd02',
    '季節時蔬': 'd03',
    '招牌豆腐': 'd04',
    '炒粉腸': 'd05',
    '高麗菜': 'd06',
    '客家小炒': 'd07',
    '炸香菇': 'd08',
    '紅燒魚': 'd09',
    '韭菜炒鴨血': 'd10',
    '香根牛肉': 'd11',
    '骨肉炒韭菜': 'd12',
    '梅干扣肉': 'd13',
    '椒鹽豬腳': 'd14',
    '椒鹽鱈魚': 'd15',
    '菜脯煎蛋': 'd16',
    '塔香煎蛋': 'd17',
    '福菜獅子頭': 'd18',
    '蒜泥腿庫': 'd19',
    '蒜炒蘿蔔': 'd20',
    '酸菜炊豬肚': 'd21',
    '鳳梨木耳炒肉絲': 'd22',
    '鳳梨蝦球': 'd23',
    '蔥爆牛肉': 'd24',
    '薑絲炒大腸': 'd25',
    '蘿蔔炊排骨': 'd26',
  };                                //菜名對應圖片
  // 咕佬肉、菜埔煎蛋、金桔高麗菜、焢肉飯 更改文字
  foodData: IFood[] = [
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "10000001",
      "goods_name": "客家湯圓",
      "price": 40
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000002",
      "goods_name": "乾麵",
      "price": 55
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000003",
      "goods_name": "客家麵食",
      "price": 55
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000004",
      "goods_name": "麻辣乾拌麵",
      "price": 70
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000005",
      "goods_name": "芋頭排骨酥麵",
      "price": 75
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000006",
      "goods_name": "蘿蔔排骨酥麵",
      "price": 75
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000007",
      "goods_name": "麻辣芋頭排骨酥麵",
      "price": 85
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000008",
      "goods_name": "麻辣蘿蔔排骨酥麵",
      "price": 75
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000009",
      "goods_name": "香炒粄條",
      "price": 75
    },
    {
      "category_no": "000001",
      "category_name": "麵類",
      "goods_img": "",
      "goods_no": "00000011",
      "goods_name": "麻香牛肉麵",
      "price": 110
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000012",
      "goods_name": "控肉飯",
      "price": 75
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000013",
      "goods_name": "滷肉飯",
      "price": 40
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000014",
      "goods_name": "白飯",
      "price": 10
    },{
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000014",
      "goods_name": "飯",
      "price": 10
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000015",
      "goods_name": "麻香乾拌飯",
      "price": 70
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000016",
      "goods_name": "麻香牛肉飯",
      "price": 100
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000059",
      "goods_name": "韭菜水餃",
      "price": 65
    },
    {
      "category_no": "000002",
      "category_name": "飯／水餃",
      "goods_img": "",
      "goods_no": "00000060",
      "goods_name": "福菜水餃",
      "price": 65
    },
    {
      "category_no": "000003",
      "category_name": "精選湯品",
      "goods_img": "",
      "goods_no": "00000017",
      "goods_name": "貢丸湯",
      "price": 40
    },
    {
      "category_no": "000003",
      "category_name": "精選湯品",
      "goods_img": "",
      "goods_no": "00000018",
      "goods_name": "芋頭排骨酥湯",
      "price": 65
    },
    {
      "category_no": "000003",
      "category_name": "精選湯品",
      "goods_img": "",
      "goods_no": "00000019",
      "goods_name": "蘿蔔排骨酥湯",
      "price": 65
    },
    {
      "category_no": "000003",
      "category_name": "精選湯品",
      "goods_img": "",
      "goods_no": "00000022",
      "goods_name": "福菜肉片湯",
      "price": 150
    },
    {
      "category_no": "000003",
      "category_name": "精選湯品",
      "goods_img": "",
      "goods_no": "00000023",
      "goods_name": "豆干排骨湯",
      "price": 150
    },
    {
      "category_no": "000003",
      "category_name": "精選湯品",
      "goods_img": "",
      "goods_no": "00000024",
      "goods_name": "酸菜肉片湯",
      "price": 150
    },
    {
      "category_no": "000004",
      "category_name": "大鍋麵",
      "goods_img": "",
      "goods_no": "00000025",
      "goods_name": "清香芋頭鍋麵",
      "price": 220
    },
    {
      "category_no": "000004",
      "category_name": "大鍋麵",
      "goods_img": "",
      "goods_no": "00000026",
      "goods_name": "清香蘿蔔鍋麵",
      "price": 220
    },
    {
      "category_no": "000004",
      "category_name": "大鍋麵",
      "goods_img": "",
      "goods_no": "00000027",
      "goods_name": "客家湯圓鍋",
      "price": 220
    },
    {
      "category_no": "000005",
      "category_name": "滷味拼盤",
      "goods_img": "",
      "goods_no": "00000028",
      "goods_name": "川椒滷味拼盤",
      "price": 120
    },
    {
      "category_no": "000005",
      "category_name": "滷味拼盤",
      "goods_img": "",
      "goods_no": "00000029",
      "goods_name": "清滷拼盤",
      "price": 100
    }, {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000030",
      "goods_name": "白斬雞",
      "price": 250
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000031",
      "goods_name": "椒鹽鱈魚",
      "price": 250
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000032",
      "goods_name": "麻油松阪豬",
      "price": 250
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000033",
      "goods_name": "紅燒牛腩",
      "price": 300
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000034",
      "goods_name": "梅根扣肉",
      "price": 200
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000035",
      "goods_name": "客家小炒",
      "price": 200
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000036",
      "goods_name": "蔥爆牛肉",
      "price": 200
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000037",
      "goods_name": "鳳梨蝦球",
      "price": 200
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000038",
      "goods_name": "紫蘇鴨",
      "price": 200
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000039",
      "goods_name": "汶爌肉",
      "price": 200
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000040",
      "goods_name": "咕老肉",
      "price": 180
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000041",
      "goods_name": "薑絲炒大腸",
      "price": 180
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000042",
      "goods_name": "鳳梨木耳炒肉絲",
      "price": 180
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000043",
      "goods_name": "炒嘛該",
      "price": 160
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000044",
      "goods_name": "骨肉炒韭菜",
      "price": 160
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000045",
      "goods_name": "客家鹹豬肉",
      "price": 160
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000046",
      "goods_name": "招牌豆腐",
      "price": 100
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000047",
      "goods_name": "橙汁排骨",
      "price": 230
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000048",
      "goods_name": "菜脯煎蛋",
      "price": 100
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000049",
      "goods_name": "塔香煎蛋",
      "price": 100
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000050",
      "goods_name": "高麗菜",
      "price": 100
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000051",
      "goods_name": "季節時蔬",
      "price": 100
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000053",
      "goods_name": "燜筍",
      "price": 80
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000054",
      "goods_name": "麻辣鴨血",
      "price": 50
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000055",
      "goods_name": "麻辣豆腐",
      "price": 50
    },
    {
      "category_no": "000006",
      "category_name": "客家傳香",
      "goods_img": "",
      "goods_no": "00000056",
      "goods_name": "綜合麻辣鴨血豆腐",
      "price": 100
    },
    {
      "category_no": "000007",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000057",
      "goods_name": "超值和菜",
      "price": 1000
    },
    {
      "category_no": "000007",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000058",
      "goods_name": "經濟和菜",
      "price": 2000
    },
    {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000059",
      "goods_name": "米苔目",
      "price": 60
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000059",
      "goods_name": "辣炒板條",
      "price": 75,
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000060",
      "goods_name": "炒粉腸",
      "price": 100
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000061",
      "goods_name": "炸香菇",
      "price": 100
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000062",
      "goods_name": "紅燒魚",
      "price": 280
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000063",
      "goods_name": "韭菜炒鴨血",
      "price": 200
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000064",
      "goods_name": "香根牛肉",
      "price": 200
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000065",
      "goods_name": "梅干扣肉",
      "price": 200
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000065",
      "goods_name": "椒鹽豬腳",
      "price": 200
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000066",
      "goods_name": "福菜獅子頭",
      "price": 280
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000067",
      "goods_name": "蒜泥腿庫",
      "price": 200
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000068",
      "goods_name": "蒜炒蘿蔔",
      "price": 120
    }, {
      "category_no": "000000",
      "category_name": "特色合菜",
      "goods_img": "",
      "goods_no": "00000069",
      "goods_name": "酸菜炊豬肚",
      "price": 200
    }
  ]
  filterData: IFood[] = [];
  food_category: String[];
  tempSelectedFood: IOrder = {
    food_img:"",        //食物圖
    meal:"",            //食物名稱
    qty:"0",             //數量
    price: 0,           //價格
    option:[],  
    reason:"",
    total: 0,
  };

  wsOrder$!: WebSocketSubject<any>;
  wsCommand$!: WebSocketSubject<any>;
  errMsg: string = '';
  // UserInfo
  mode = mode.debug;                 //開發模式(影響detect)
  phoneMode = Enum_PHONE_Mode.close; //Phone按鈕呈現
  userInfo: IInfo;                   //user資訊
  userImg: string;                   //user Image
  imgTime: string;                   //圖片時間戳
  // Chat
  msg: IMessage;                     //接收temp消息
  messages: IMessage[] = [];         //全部消息
  prev_from: Array<string> = [];     //消息來源
  isPhone: boolean = false;          //紀錄Phone鍵 status
  status: string = this.isPhone ? '請說話接收餐點中...' : '關閉收音模式'
  ad: boolean = false;               //顯示廣告
  ads_food: IOrder[] = [];           //廣告data
  // Modal
  chat: any;
  food_dialog: any;
  cart_dialog: any;
  // Cart
  myCart: IOrder[] = [];              //目前user加入購物車食物
  amount_to_Pay: number = 0;          //food小計
  // Menu 
  menu_item!:Node;
  menu_header!:Node;

  constructor(private router: Router, private wsService: WsService) {
    this.wsService.selectWs(ENUM_WS_LOCATIONS.orderSocket).subscribe((res) => {
      this.wsOrder$ = res.ws;
    })
    this.wsService.selectWs(ENUM_WS_LOCATIONS.commandSocket).subscribe((res) => {
      this.wsCommand$ = res.ws;
    })
    
  }

  ngOnInit() {
    this.myCart = [];
    this.messages = [];

    this.chat = document.querySelector(".chatContent .chat");
    this.food_dialog = $('#menuModal');
    this.cart_dialog = $('#cartModal');
    this.imgTime = new Date().getTime().toString();

    //get info
    let info = this.getInfoAndCart();
    //subject socket
    info.subscribe((res) => {
      if (res) {
        this.wsOrder$.next("hello" + "," + this.userInfo.gender);
        this.wsOrderInit();
        this.wsCommandInit();
      }
    })
    this.foodDataInit();
    this.dragScrolling();
    const category = this.foodData.map(item => item.category_name);
    this.food_category = category.filter((item, index, arr) => arr.indexOf(item) === index);
    
    this.menu_item = document.querySelector('.menu-items');
    this.menu_header = document.querySelector('.menu-header');

    const autoPhone = setTimeout(function(){
      if(this.phoneMode === Enum_PHONE_Mode.close)
        this.sendPhone();
      clearTimeout(autoPhone);
    }.bind(this), 4000)
  }

  /* ***
   *   websocket
   * ***/
  wsOrderInit() {
    this.wsOrder$.subscribe({
      next: msg => {
        this.msg = JSON.parse(JSON.stringify(msg));

        console.log("subject msg received:\n", msg);
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
            if (this.msg.msg == "open"){
              this.food_dialog.modal('show');
              this.cart_dialog.modal('hide');
             }
            if (this.msg.msg == "close") {
              this.food_dialog.modal('hide');
            }
            break;

          case "msg":
            console.log('sub msg');
            if (this.msg.from === "AI") {
              this.status = "AI Waiter 說話中...";
            }
            // if (this.food_dialog.css('display') == "block") {
            //   this.food_dialog.modal('hide');
            // }
            this.prev_from.push(this.msg.from);
            this.orderApi(this.msg);
            break;

          case "end":
            console.log("確定結帳!");
            this.setSessionCart();
            break;

          case "ad":
            if (this.ad === false) this.ad = true;
            let data = JSON.parse(this.msg.msg);
            this.ads_food = JSON.parse(JSON.stringify(data));
            //推薦餐點處理
            this.processAds(this.ads_food);
            break;

          case "ready":
            console.log('sub ready');
            if (this.phoneMode === Enum_PHONE_Mode.open) {
              this.sendPhone();
            } else if (this.phoneMode === Enum_PHONE_Mode.close) {
              this.sendPhoneOff();
            }
            break;

          case "processing":
            console.log('sub processing');
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
      error: err => {
        console.log('斷 order')
        this.errMsg = 'wsOrder，type: ' + err.type;
        this.wsReconnect(ENUM_WS_LOCATIONS.orderSocket);
      }, // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }
  wsCommandInit() {
    this.wsCommand$.subscribe({
      next: msg => {
        this.msg = JSON.parse(JSON.stringify(msg));
        switch (this.msg.status) {
          case "msg":
            console.log('sub msg');
            if (this.msg.from === "AI") {
              this.status = "AI Waiter 說話中...";
            }
            if (this.food_dialog.css('display') == "block") {
              this.food_dialog.modal('hide');
            }
            this.prev_from.push(this.msg.from);
            this.orderApi(this.msg);
            break;
        
          case "ad":
            if (this.ad === false) this.ad = true;
            let data = JSON.parse(this.msg.msg);
            this.ads_food = JSON.parse(JSON.stringify(data));
            //推薦餐點處理
            this.processAds(this.ads_food);
            break;

          case "end":
            console.log("確定結帳!");
            this.setSessionCart();
            break;
          default:
            // alert('Error!');
            break;
        }
      },
      error: err => {
        this.errMsg += 'wsCommand，type: ' + err.type;
        console.log('斷 Command')
        this.wsReconnect(ENUM_WS_LOCATIONS.commandSocket);
      }
    })
  }
  wsReconnect(ws: ENUM_WS_LOCATIONS) {
    if (ws == ENUM_WS_LOCATIONS.orderSocket) {
      const reconnect_order = setTimeout(function () {
        console.log('重新連線! order', this.phoneMode);
        this.wsOrderInit();
        this.errMsg = '';
        // 連線完成後給命令
        if (this.phoneMode === Enum_PHONE_Mode.open) {
          this.sendPhone();
        } else {
          this.sendPhoneOff();
        }
        clearTimeout(reconnect_order);
      }.bind(this), 5000)
    }
    if (ws == ENUM_WS_LOCATIONS.commandSocket) {
      const reconnect_command = setTimeout(function () {
        console.log('重新連線! command');
        this.wsCommandInit();
        this.errMsg = '';
        clearTimeout(reconnect_command);
      }.bind(this), 5000)
    }
  }

  /* ***
   *   Cart
   * ***/
  getInfoAndCart(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // userInfo session check
      let info = sessionStorage.getItem('info');
      this.userInfo = JSON.parse(info);
      if (this.userInfo.age < 0) {
        //預設圖片
        this.userImg = "1_10_boy.jpg";
      }
      else if (this.userInfo.age >= 1 && this.userInfo.age < 11) {
        this.userInfo.gender === 'Male' ? this.userImg = "1_10_girl.jpg" : this.userImg = "1_10_boy.jpg";
      }
      else if (this.userInfo.age >= 11 && this.userInfo.age < 50) {
        this.userInfo.gender === 'Male' ? this.userImg = "11_50_girl.jpg" : this.userImg = "11_50_boy.jpg";
      }
      else if (this.userInfo.age >= 50) {
        this.userInfo.gender === 'Male' ? this.userImg = "51_girl.jpg" : this.userImg = "51_boy.jpg";
      }

      // Cart session check
      let cart = sessionStorage.getItem('myCart');
      console.log('myCart：', cart);
      if (cart) {
        this.myCart = JSON.parse(cart).items;
        this.proccessPay();
      }

      observer.next(true);
    })
  }
  orderApi(_msg: IMessage) {
    let tempCart: IOrder = {
      meal: '',
      qty: '',
      option: [],
      price: 0,
      food_img: '',
      reason: '',
      total: 0
    };
    // console.log('messages',this.messages);
    tempCart.option = [];
    if (_msg.meal != '' && _msg.meal != 'undefined') {
      // 判斷是否有重複
      const result: IOrder = this.myCart.find((item) => item.meal === _msg.meal);
      if (result == null) {
        tempCart.meal = _msg.meal.toString();
        tempCart.qty = _msg.qty.toString();
        tempCart.price = this.getPrice(_msg.meal);
        tempCart.total = parseInt(tempCart.qty) * tempCart.price;
        this.myCart.push(JSON.parse(JSON.stringify(tempCart)));
      } else {
        // Cart
        result.qty = (parseInt(result.qty) + parseInt(_msg.qty)).toString();
        result.total = parseInt(result.qty) * result.price;
        // temp to msg
        tempCart.price = result.price;
        tempCart.total = result.total;
      }
      this.amount_to_Pay = this.amount_to_Pay + (parseInt(_msg.qty) * tempCart.price);

      // msg
      _msg.food_img = 'food_' + this.food[_msg.meal];
      _msg.price = tempCart.price;
      _msg.total = tempCart.total;
      _msg.amount_to_Pay = this.amount_to_Pay;
    }

    this.messages.push(JSON.parse(JSON.stringify(_msg)));
    this.scrollDown();
  }
  processAds(_ads: IOrder[]) {
    console.log("推薦菜單\n", _ads);
    //get image
    _ads.forEach(ad => {
      ad.food_img = 'food_' + this.food[ad.meal];
      ad.price = this.getPrice(ad.meal);
    });
    this.ads_food = _ads;
    this.scrollDown();
  }
  getPrice(_meal: string): number {
    const food: IFood = this.foodData.find(item => item.goods_name === _meal);
    return food.price;
  }

  /*
  *   Chat
  */
  scrollDown() {
    //Bottom Scroll
    setTimeout(() => {
      this.chat.scrollTo({
        top: this.chat.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }

  /* ***
   *  Btn function
   * ***/

  /* *** Order 點餐
   * manual 推薦點餐
   * delete 刪除餐點
   *    _method : manual(購物車) 、 msg(消息)
   * math   購物車新增減少數量
   * ***/

  manualOrder(_order: IOrder) {
    _order.qty="1";
    console.log('next order', JSON.stringify(_order));
    this.wsCommand$.next("order," + JSON.stringify(_order));

    // this.ads_food = [];
    this.isPhone = true;
  }
  deleteOrder(_order: IOrder, _method = 'manual') {
    if (_method == "msg") {
      console.log('next delete-order', JSON.stringify(_order))
      this.wsCommand$.next("delete_order," + JSON.stringify(_order))
    }
    this.myCart.forEach((item, index) => {
      if (item.meal !== _order.meal) return;

      item.qty = (parseInt(item.qty) - parseInt(_order.qty)).toString();
      if (parseInt(item.qty) <= 0) {
        this.myCart.splice(index, 1);
      }
    });

    this.proccessPay();
  }
  deleteTarget(target:HTMLElement){
    target.remove();
  }
  mathOrder(_order, methods: string) {
    let qty = parseInt(_order.qty);
    if (methods == 'minus') {
      if (qty > 0) {
        qty = qty - 1;
        if (qty == 0) this.deleteOrder(_order);
      }
    }
    if (methods == 'plus') {
      qty = qty + 1;
    }
    _order.total = qty * _order.price;
    _order.qty = qty.toString();
    this.proccessPay();
  }
  proccessPay() {
    this.amount_to_Pay = 0;
    this.myCart.forEach((item) => {
      this.amount_to_Pay += item.total;
    })
  }

  phone() {
    if (this.phoneMode === Enum_PHONE_Mode.close) {
      // 切換自動收音
      this.sendPhone();
    }
    else if (this.phoneMode === Enum_PHONE_Mode.open) {
      // 切換禁止收音
      this.sendPhoneOff();
    }
  }
  sendPhone() {
    this.wsOrder$.next('phone');
    this.status = '請說話，接收餐點中...';
    this.isPhone = true;
    this.phoneMode = Enum_PHONE_Mode.open;
  }
  sendPhoneOff() {
    console.log('next phone-off')
    this.wsCommand$.next('phone_off');
    this.status = '關閉收音模式';
    this.isPhone = false;
    this.phoneMode = Enum_PHONE_Mode.close;
  }

  //確定點餐
  finish() {
    console.log('next finish');
    this.wsCommand$.next("finish");
  }
  setSessionCart() {
    if (this.myCart.length > 0) {
      console.log('購物車訂購');
      const sessionCart: ICart = {
        items: [],
        amount_to_Pay: 0
      };
      sessionCart.items = this.myCart;
      sessionCart.amount_to_Pay = this.amount_to_Pay;

      this.sendPhoneOff();
      this.cart_dialog.modal('hide');
      this.food_dialog.modal('hide');
      sessionStorage.setItem("myCart", JSON.stringify(sessionCart));
      this.router.navigateByUrl("/ai_check");
    } else {
      alert('結帳未成功，購物車為空!');
    }
  }
  aiHome() {
    this.wsOrder$.next('stop_talk');
    this.wsOrder$.complete();
    this.router.navigateByUrl('/ai_home');
  }
  // KIOSK 傳統點餐
  menuOpen(){
    this.menuInit();
    const allCategory = this.menu_header.firstChild as HTMLElement;
    allCategory.classList.add('active');
    this.filterData = this.foodData;
  }
  menuInit(){
    this.clearSelected(this.menu_header);
    this.clearSelected(this.menu_item);
    this.tempSelectedFood = {
      food_img:"",        //食物圖
      meal:"",            //食物名稱
      qty:"0",             //數量
      price: 0,           //價格
      option:[],  
      reason:"",
      total: 0,
    };
  }
  foodDataInit() {
    this.foodData.forEach( (item) => {
      item.goods_img = 'food_' + this.food[item.goods_name];
    });
    this.filterData = this.foodData;
  }
  dragScrolling() {
    const slider: any = document.querySelector('.menu-header');
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.changedTouches[0].screenX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      console.log(startX);
    });
    slider.addEventListener('touchend', () => {
      isDown = false;
    });
    slider.addEventListener('touchcancel', () => {
      isDown = false;
    });
    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const touch = e.changedTouches[0];
      const x = touch.screenX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;

      console.log(walk);
    });
  }
  filterItems(_cat: String, target:any) {
    console.log(target);
    this.menuInit();

    if (_cat === 'all')
      this.filterData = this.foodData;
    else
      this.filterData = this.foodData.filter(item => item.category_name == _cat);
    
    this.clearSelected(this.menu_header);
    target.classList.add('active');

    console.log(this.filterData);
  }
  selectFood(order:IFood, target:any){
    this.tempSelectedFood.food_img = order.goods_img;
    this.tempSelectedFood.meal = order.goods_name;
    this.tempSelectedFood.price = order.price;
    this.tempSelectedFood.qty = "1";

    this.clearSelected(this.menu_item);
    target.classList.add('active');
  }
  clearSelected(parent:Node){
    console.log(parent)
    let nodes = (parent) ? parent.childNodes : [];
    nodes.forEach( node => {
      if(node.nodeName === "DIV"){
        if(node.classList.contains('active')){
          node.classList.remove('active');
        }
      }
    });
  }
  mathFood(_order, methods: string) {
    let qty = parseInt(_order.qty);
    if (methods == 'minus') {
      if (qty > 0) {
        qty = qty - 1;
      }
    }
    if (methods == 'plus') {
      qty = qty + 1;
    }
    _order.total = qty * _order.price;
    _order.qty = qty.toString();
  }
  confirmFood(){
    let qty = parseInt(this.tempSelectedFood.qty)
    if(qty !== null && qty > 0){
      this.processCart(this.tempSelectedFood);
    }
  }
  processCart(_msg:IOrder){
    let tempCart: IOrder = {
      meal: '',
      qty: '',
      option: [],
      price: 0,
      food_img: '',
      reason: '',
      total: 0
    };

    tempCart.option = [];
    if (_msg.meal != '' && _msg.meal != 'undefined') {
      // 判斷是否有重複
      const result: IOrder = this.myCart.find((item) => item.meal === _msg.meal);
      if (result == null) {
        tempCart.meal = _msg.meal.toString();
        tempCart.qty = _msg.qty.toString();
        tempCart.price = this.getPrice(_msg.meal);
        tempCart.total = parseInt(tempCart.qty) * tempCart.price;
        this.myCart.push(JSON.parse(JSON.stringify(tempCart)));
      } else {
        // Cart
        result.qty = (parseInt(result.qty) + parseInt(_msg.qty)).toString();
        result.total = parseInt(result.qty) * result.price;
      }
      this.menuInit();
      this.proccessPay();
    }
  }
}
