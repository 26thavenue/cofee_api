export type Staff = {
    name:string,
    password:string
    email:string,
    isAdmin ?: boolean
}
export  type Product = {
    name:string,
    price: number,
    quantity: number
}
// export enum OrderStatus {
//   PENDING = "pending",
//   PROCESSING = "processing",
//   COMPLETED = "completed",
// }

export type Order = {
  order_name: string,
  customer_name: string,
  ordered_at: Date,
  status: string,
};