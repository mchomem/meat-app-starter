import { Component, OnInit } from '@angular/core'
import { RadioOption } from '../shared/radio/radio-option.model'
import { OrderService } from './order.service'
import { CartItem } from '../restaurant-details/shopping-cart/cart-item.model'
import { Order, OrderItem } from './order.model'
import { Router } from '@angular/router'

// Paradigma do Angular: Ractive Forms com FormGroup e FormBuilder
// O código fica mais verboso, porém o template da página fica mais enxuto.
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup
  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro' , value: 'MON' }
    , { label: 'Cartão de débito' , value: 'DEB' }
    , { label: 'Cartão refeição' , value: 'REF' }
  ]

  constructor(private orderService: OrderService
              , private router: Router
              , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      /* Reative forms: Aqui ficam os campos/componentes do formulário
       * que serão vinculados e configurados com os 
       * componentens da página. */
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
      , email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)])
      , emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)])
      , address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
      , number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)])
      , optionalAddress: this.formBuilder.control('')
      , paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validator: OrderComponent.equalsTo })
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    
    // Caso esses dois campos não existam no grupo do formulário
    if(!email || !emailConfirmation) {
      return undefined
    }

    if(email.value !== emailConfirmation.value) {
      return { emailsNoMatch: true } // o nome da chave (emailsNoMatch) pode ser qualquer nome, e será utilizado no template.
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.drecreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItens = this.cartItems()
      .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe( (orderId: string) => {
      this.router.navigate(['/order-summary'])
      // console.log(`Compra concluída: ${orderId}`)
      this.orderService.clear()
    })

    console.log(order)
  }

  returnRestaurantsMenu() {
    this.router.navigate(['/restaurants'])
  }

}
