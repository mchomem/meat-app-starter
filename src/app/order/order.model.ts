class Order {
    constructor
    (
        public address: string
        , public number: number
        , public optionalAddress: string
        , public paymentOption: string
        , public orderItens: OrderItem[] = []
    ) {}
}

class OrderItem {
    constructor(public quantity: number, public menuId: string ) {}
}

// Outra forma de exportar uma classe
export { Order, OrderItem}