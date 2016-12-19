import {Component} from '@angular/core';

@Component({
    selector: 'c2s-logout',
    template: `
                <span>
                    <a href="#" class="btn btn-success navbar-blueGray" (click)="logout()">
                        <i class="fa fa-sign-out"></i>
                        <span class="force-inline hidden-xs">Logout</span>
                    </a>
                </span>
`
})

export class LogoutComponent {

    logout(): void {
        //TODO: Extract it in authenticationService later
        sessionStorage.clear();
        window.location.href = '/pp-ui/fe/login';
    }
}