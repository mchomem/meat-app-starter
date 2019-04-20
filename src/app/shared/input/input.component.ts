import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core'
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any
  @Input() label: string
  @Input() errorMessage: string

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit() {
  }

  // Esse método será chamado quando o conteúdo for defindo.
  ngAfterContentInit() {
    /* Reactive forms: para não desfazer a abordagem de NgModel, basta ajustar o código para acrescentar o uso de FormControlName (ou) */
    this.input = this.model || this.control
    if(this.input === undefined) {
      throw new Error('Esse componente precisar ser usado com a diretiva ngModel ou formControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }

}
