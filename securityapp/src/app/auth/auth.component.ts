import { Component, OnInit } from "@angular/core";
import { AuthUser } from "../shared/models/user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-auth",
    moduleId: module.id,
    templateUrl: "auth.component.html"
})
export class AuthComponent implements OnInit {
    public user: AuthUser = null;
    public isLoggingIn = true;

    constructor(private router: Router, public authService: AuthService) {
        this.user = {
            email: "text@text.com",
            password: "password"
        };
    }

    ngOnInit() {
        if (this.authService.isAuthenticated) {
            this.router.navigate(["/items"]);
        }
    }

    public submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    public toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    private login() {
        this.authService.login(this.user).subscribe(
            () => {
                this.router.navigate(["/items"]);
            },
            error => {
                alert("Sorry, we couldn't log you in");
            }
        );
    }
    private signUp() {
        this.authService.signUp(this.user).subscribe(
            () => {
                alert("Your account has been created");
                this.toggleDisplay();
            },
            error => {
                alert("Sorry, we couldn't log you up");
            }
        );
    }
}
