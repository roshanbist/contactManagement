export class CustomError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(message);
  }
}

// 400: Bad Request
export class BadRequest extends CustomError {
  constructor(readonly message: string = 'Bad Request') {
    super(400, message);
  }
}

// 401: Unauthorized
export class Unauthorized extends CustomError {
  constructor(readonly message: string = 'Not Authorized') {
    super(401, message);
  }
}

// 403: Forbidden
export class Forbidden extends CustomError {
  constructor(readonly message: string = 'Forbidden to access') {
    super(403, message);
  }
}

// 404: Not Found
export class NotFound extends CustomError {
  constructor(readonly message: string = 'Not Found') {
    super(404, message);
  }
}

// 500: Server Error
export class ServerError extends CustomError {
  constructor(readonly message: string = 'Internal Server Error') {
    super(500, message);
  }
}
