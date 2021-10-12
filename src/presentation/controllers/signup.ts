import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) badRequest(new MissingParamError('name'))
    if (!httpRequest.body.email) badRequest(new MissingParamError('email'))
    return {
      statusCode: 200,
      body: 'any_body'
    }
  }
}
