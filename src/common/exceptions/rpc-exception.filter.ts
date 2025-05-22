import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

interface RpcErrorResponse {
    status: number;
    message: string;
    [key: string]: any;
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    private isRpcErrorResponse(error: any): error is RpcErrorResponse {
        return (
            typeof error === 'object' &&
            error !== null &&
            'status' in error
        );
    }

    private getStatusCode(status: any): number {
        const parsedCode = Number(status);
        return isNaN(parsedCode) ? 400 : parsedCode;
    }

    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();

        if (rpcError?.toString?.().includes('Empty response')) {
            return response.status(500).json({
                status: 500,
                message: 'Empty response from microservice',
            });
        }

        if (this.isRpcErrorResponse(rpcError)) {
            const status = this.getStatusCode(rpcError.status);
            const message = typeof rpcError.message === 'string'
                ? rpcError.message
                : 'An unexpected error occurred';

            return response.status(status).json({
                status,
                message,
            });
        }

        return response.status(400).json({
            status: 400,
            message: typeof rpcError === 'string' ? rpcError : 'Unexpected error',
        });
    }

}

