import {ExceptionFilter, Catch, ArgumentsHost, HttpException, Res} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
	catch(error: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		response
			.status(500)
			.json({
				timestamp: new Date().toISOString(),
				error: {
					message: error.message,
					stack: error.stack
				}
			});
	}
}
