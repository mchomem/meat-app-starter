import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { NotificationService } from '../notification.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'], 
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0
        , bottom: '0px' // pode passar o valor literal ou string indicando a unidade
      }))
      , state('visible', style({
        opacity: 1
        , bottom: '30px'
      }))
      , transition('hidden => visible', animate('500ms 0s ease-in'))
      , transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    
    // Para inscrever esse componente para receber o serviço de notificação disparado por qualquer outro componente na app.
    this.notificationService.notifier
      .do(message => {
        this.message = message // Para fazer a mensagem chegar ao componente snackbar
        this.snackVisibility = 'visible'
      }).switchMap(message => Observable.timer(3000)) // usar switchMap para encadear Observables
      .subscribe(timer => this.snackVisibility = 'hidden')
  }

  // Para teste da animação
  // toggleSnack() {
  //   this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden'
  // }

}
