export interface IInfo {
    age: number,
    gender: string
}

export interface IMessage{
    status:string,    //訊息狀態(msg, err, end, ad, menu, ready, processing)
    from:string,      //來源(User, AI)
    msg:string,       //訊息
    food_img:string,
    meal:string,      //食物名稱
    option:Array<string>,
    qty:string,       //數量
    price:number,     //價格
    sub_total:number, //小計
};               // 发送的消息内容

export interface IOrder{
    meal:string,
    option:Array<string>,
    qty:string,
    price:number,
    food_img:string,
    reason:string,
};               // 发送的消息内容