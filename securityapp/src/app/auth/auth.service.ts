import { Injectable } from '@angular/core'

import * as appSettingsModule from 'tns-core-modules/application-settings'

import { Observable, of } from 'rxjs'
import { AuthUser } from '../shared/models/user.model'
import { HttpClient } from '@angular/common/http'
import { Config } from '~/config'
import { tap } from 'rxjs/operators'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'
const EXPIRATION_KEY = 'EXPIRATION_KEY'

@Injectable()
export class AuthService {
  public get isAuthenticated(): boolean {
    const expires = appSettingsModule.getNumber(EXPIRATION_KEY)

    if (!expires) {
      return false
    }
    return new Date().getTime() < expires
  }

  private setToken(accessToken: string): void {
    appSettingsModule.setString(ACCESS_TOKEN_KEY, accessToken)
  }

  private setExpiration(expires: number): void {
    appSettingsModule.setNumber(EXPIRATION_KEY, expires * 1000)
  }

  public getToken(): string {
    return appSettingsModule.getString(ACCESS_TOKEN_KEY)
  }

  constructor(private http: HttpClient) {}

  public login(user: AuthUser): Observable<any> {
    return this.http
      .post(`${Config.apiUrl}/login`, {
        ...user
      })
      .pipe(
        tap(result => {
          console.log('token received: ' + result.access_token)
          this.setToken(result.access_token)
          this.setExpiration(Number(result.expires))
        })
      )
  }

  public signUp(user: AuthUser): Observable<any> {
    return this.http.post(`${Config.apiUrl}/register`, {
      ...user
    })
  }

  public logout() {
    this.setToken('')
    this.setExpiration(0)
    return of(null)
  }
}
