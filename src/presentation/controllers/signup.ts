import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { emailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: emailValidator) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requeiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requeiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
      return { statusCode: 200, body: 'any_body' }
    } catch (error) {
      return serverError()
    }
  }
}
