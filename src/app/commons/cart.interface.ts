import { IOrder } from "./talk.interface";

export interface ICart{
    amount_to_Pay: number,
    items: IOrder[],
};