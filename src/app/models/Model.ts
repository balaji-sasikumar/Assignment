export class Products {
    constructor(
      public productName: string,
      public productId: string,
      public availableQuantity: number
  
    ) {
  
    }
  }


export class Orders{
  constructor(
    public productId:string,
    public orderId:string,
    public customerId:string,
    public neededQuantity:number

  ){}
}
  