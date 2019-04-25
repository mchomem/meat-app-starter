import { HttpErrorResponse } from '@angular/common/http'
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs/Observable'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { NotificationService } from './shared/messages/notification.service'
import { LoginService } from './security/login/login.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService
        , private injector: Injector
        , private zone: NgZone) { // NgZone para monitorar a execução dos scripts
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        /* O uso de injector é para resolver problemas de dependência ciclica
                         que o Angular detecta. */
                        this.injector.get(LoginService).handleLogin()
                        break

                    case 403:
                        this.ns.notify(message || 'Não autorizado.')
                        break

                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique console para mais detalhes')
                        break
                }
            })
        }
        super.handleError(errorResponse)
    }
}
