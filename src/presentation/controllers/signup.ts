import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requeiredFields = ['name', 'email']
    for (const field of requeiredFields) {
      if (!httpRequest.body[field]) badRequest(new MissingParamError(field))
    }
    return {
      statusCode: 200,
      body: 'any_body'
    }
  }
}
