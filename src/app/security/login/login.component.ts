import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginService } from './login.service'
import { User } from './user.model'
import { NotificationService } from '../../shared/messages/notification.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'mt-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup
    navigatieTo: string

    constructor(private fb: FormBuilder
        , private loginService: LoginService
        , private notificationService: NotificationService
        , private activatedRoute: ActivatedRoute
        , private router: Router) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email])
            , password: this.fb.control('', [Validators.required])
        })
        this.navigatieTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
    }

    login() {
        this.loginService
            .login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                user => this.notificationService.notify(`Bem vindo, ${user.name}`)
                // O response é do tipo HttpErrorResponse
                , response => this.notificationService.notify(response.error.message)
                , () => {
                    this.router.navigate([atob(this.navigatieTo)])
                })
    }

}
