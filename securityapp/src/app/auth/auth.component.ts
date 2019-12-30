import { Component, OnInit } from '@angular/core'
import { AuthUser } from '../shared/models/user.model'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { ITnsOAuthTokenResult } from 'nativescript-oauth2'
import { HttpHeaders, HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-auth',
  moduleId: module.id,
  templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
  public user: AuthUser = null
  public isLoggingIn = true
  public name: string = ''

  constructor(
    private router: Router,
    public authService: AuthService,
    private http: HttpClient
  ) {
    this.user = {
      email: 'nh@gmail.com',
      password: 'password'
    }
  }

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/items'])
    }
    console.log(this.name)
  }

  public submit() {
    if (this.isLoggingIn) {
      this.login()
    } else {
      this.signUp()
    }
  }

  public toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn
  }

  private login() {
    this.authService.login(this.user).subscribe(
      () => {
        this.router.navigate(['/items'])
      },
      error => {
        alert("Sorry, we couldn't log you in")
      }
    )
  }
  private signUp() {
    this.authService.signUp(this.user).subscribe(
      () => {
        alert('Your account has been created')
        this.toggleDisplay()
      },
      error => {
        alert("Sorry, we couldn't sign you up")
      }
    )
  }

  public onLoginFacebookTap() {
    this.authService.facebookLogin().then((result: ITnsOAuthTokenResult) => {
      console.log('back to app component with token ' + result.accessToken)
      this.getFacebookUserName()
    })
  }

  public onLoginFacebookProxyTap() {
    this.authService
      .facebookProxyLogin()
      .then((result: ITnsOAuthTokenResult) => {
        console.log('back to app component with token ' + result.accessToken)
        this.getFacebookUserName()
      })
  }

  public onLoginMicrosoftTap() {
    this.authService.microsoftLogin().then((result: ITnsOAuthTokenResult) => {
      console.log('back to app component with token ' + result.accessToken)
      this.getMicrosoftName()
    })
  }

  public onLoginAuth0Tap() {
    this.authService.auth0Login()
  }

  private getFacebookUserName() {
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    this.http
      .get<{ name: string }>('https://graph.facebook.com/v5/me?fields=name', {
        headers
      })
      .subscribe(result => {
        this.name = result.name
      })
  }

  private getMicrosoftName() {
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    this.http
      .get<{ displayName: string }>('https://graph.microsoft.com/v1.0/me', {
        headers
      })
      .subscribe(result => {
        this.name = result.displayName
      })
  }
}
