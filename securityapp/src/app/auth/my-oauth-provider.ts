import {
  TnsOaProvider,
  TnsOaProviderOptions,
  OpenIdSupportNone,
  TnsOaUnsafeProviderOptions
} from 'nativescript-oauth2/providers'
import { ITnsOAuthTokenResult } from 'nativescript-oauth2'

export interface TnsOaMyCustomProviderOptions
  extends TnsOaUnsafeProviderOptions {}

export class TnsOaProviderMyCustomProvider implements TnsOaProvider {
  public options: TnsOaProviderOptions
  public openIdSupport: OpenIdSupportNone = 'oid-none'
  public providerType = 'myCustomProvider'
  public authority = 'https://www.facebook.com/v3.1/dialog'
  public tokenEndpointBase = 'http://localhost:7071'
  public authorizeEndpoint = '/oauth'
  public tokenEndpoint = '/api/MySecurityHttpTriggerFunction'
  public cookieDomains = ['facebook.com']

  constructor(options: TnsOaMyCustomProviderOptions) {
    this.options = options
  }

  public parseTokenResult(jsonData): ITnsOAuthTokenResult {
    return jsonData
  }
}
