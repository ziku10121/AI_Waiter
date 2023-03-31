export interface IInfo {
    age: number,
    gender: string
}

export interface IMessage{
    status:string,    //訊息狀態(msg, err, end, ad, menu, ready, processing)
    from:string,      //來源(User, AI)
    msg:string,       //訊息
    food_img:string,
    meal:string,      
    option:Array<string>,
    qty:string,       
    price:number,
    total:number,
    // food: IOrder,
    amount_to_Pay:number, //小計
};

export interface IOrder{
    food_img:string,        //食物圖
    meal:string,            //食物名稱
    qty:string,             //數量
    price: number,           //價格
    option:Array<string>,  
    reason:string,
    total: number,
};

export interface IFood{
    category_no:string,
    category_name: string,
    goods_img: string,
    goods_no: string,
    goods_name: string,
    price: number
}

export enum Enum_PHONE_Mode{
    open    ="open",
    close   ="close"
}