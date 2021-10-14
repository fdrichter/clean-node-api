import { HttpRequest, HttpResponse, Controller, emailValidator } from '../protocols'
import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../errors'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: emailValidator,
    private readonly addAccount: AddAccount
  ) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requeiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requeiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!isValid) return badRequest(new InvalidParamError('email'))
      this.addAccount.add({
        name,
        email,
        password
      })
      return { statusCode: 200, body: 'any_body' }
    } catch (error) {
      return serverError()
    }
  }
}
