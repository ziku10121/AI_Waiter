export interface IBill {
    company : String,
    branch : String,
    address : String,
    phone : String,
    carrier : String,
    total : String,
    pay: String,
    items : item[]
}

export interface item {
    name: String,
    subtotal: String,
    qty: String
}