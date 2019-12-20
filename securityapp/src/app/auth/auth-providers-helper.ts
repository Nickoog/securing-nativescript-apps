import { configureTnsOAuth } from 'nativescript-oauth2'
import {
  TnsOaProvider,
  TnsOaProviderOptionsFacebook,
  TnsOaProviderFacebook,
  TnsOaProviderOptionsMicrosoft,
  TnsOaProviderMicrosoft
} from 'nativescript-oauth2/providers/providers'

export function configureOAuthProviders() {
  const facebookProvider = configureOAuthProviderFacebook()
  const microsoftProvider = configureOAuthProviderMicrosoft()
  configureTnsOAuth([facebookProvider, microsoftProvider])
}

function configureOAuthProviderFacebook(): TnsOaProvider {
  const options: TnsOaProviderOptionsFacebook = {
    openIdSupport: 'oid-none',
    clientId: '2580205072256646',
    clientSecret: '853abc01ffa3c3f81880c59ab2901661',
    redirectUri: 'https://www.facebook.com/connect/login_success.html',
    scopes: ['email'] //list of scopes
  }

  const facebookProvider = new TnsOaProviderFacebook(options)
  return facebookProvider
}

function configureOAuthProviderMicrosoft(): TnsOaProvider {
  const options: TnsOaProviderOptionsMicrosoft = {
    openIdSupport: 'oid-full',
    clientId: 'bb6eaff7-921e-4269-8dc5-458bd1d7d3a0',
    redirectUri: 'msalbb6eaff7-921e-4269-8dc5-458bd1d7d3a0://auth',
    urlScheme: 'msalbb6eaff7-921e-4269-8dc5-458bd1d7d3a0',
    scopes: ['openid', 'User.Read'] // list of scopes
  }

  const microsoftProvider = new TnsOaProviderMicrosoft(options)
  return microsoftProvider
}
