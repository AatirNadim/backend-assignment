import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError, TypeORMError } from "typeorm";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { PostgresError } from "pg-error-enum";
import { Response } from "express";

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    let statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
    let message: string = "Database error";

    if (exception instanceof QueryFailedError) {
      if (exception.driverError?.code === PostgresError.UNIQUE_VIOLATION) {
        message = "Duplicate entry";
        statusCode = HttpStatus.CONFLICT;
      }
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
