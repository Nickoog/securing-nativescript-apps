import { Injectable } from "@angular/core";

import * as appSettingsModule from "tns-core-modules/application-settings";

import { Observable, of } from "rxjs";
import { AuthUser } from "../shared/models/user.model";

const AUTHENTICATED_KEY = "AUTHENTICATED_KEY";

@Injectable()
export class AuthService {
    private users: AuthUser[] = [
        { email: "text@text.com", password: "password" }
    ];

    public get isAuthenticated() {
        return appSettingsModule.getBoolean(AUTHENTICATED_KEY);
    }

    public set isAuthenticated(val: boolean) {
        appSettingsModule.setBoolean(AUTHENTICATED_KEY, val);
    }

    constructor() {}

    public login(user: AuthUser): Observable<any> {
        const foundUser = this.users.find(
            u => u.email === user.email && u.password === user.password
        );
        if (foundUser) {
            this.isAuthenticated = true;
        }
        return of(null);
    }

    public signUp(user: AuthUser): Observable<any> {
        return of(null);
    }

    public logout() {
        this.isAuthenticated = false;
        return of(null);
    }
}
