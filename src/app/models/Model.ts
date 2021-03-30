export class Products {
  constructor(
    public productName: string,
    public productId: string,
    public availableQuantity: number,
    public price: number,
    public date: Date
  ) {}
}

export class Orders {
  constructor(
    public productId: string,
    public orderId: string,
    public customerId: string,
    public quantity: number,
    public invoiceDate: Date,
    public product: Products,
    public deliveredDate: Date
  ) {}
}
