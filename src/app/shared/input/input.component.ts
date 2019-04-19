import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core'
import { NgModel } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any
  @Input() label: string
  @Input() errorMessage: string

  @ContentChild(NgModel) model: NgModel

  constructor() { }

  ngOnInit() {
  }

  // Esse método será chamado quando o conteúdo for defindo.
  ngAfterContentInit() {
    this.input = this.model
    if(this.input === undefined) {
      throw new Error('Esse componente precisar ser usado com a diretiva ngModel')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }

}
