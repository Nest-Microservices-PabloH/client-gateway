import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcErrorResponse {
    status: number;
    message: string;
    [key: string]: any;
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {

    private isRpcErrorResponse(error: unknown): error is RpcErrorResponse {
        return (
            typeof error === 'object' &&
            error !== null &&
            'status' in error
        );
    }

    private isEnotfoundError(error: unknown): boolean {
        return (
            typeof error === 'object' &&
            error !== null &&
            (error as any)?.code === 'ENOTFOUND' &&
            (error as any)?.errno === -3008
        );
    }

    private isEconnrefusedError(error: unknown): boolean {
        return (
            typeof error === 'object' &&
            error !== null &&
            (error as any)?.chainedError?.code === 'ECONNREFUSED'
        );
    }

    private isEmptyResponseException(error: unknown): boolean {
        if (error instanceof Error) {
            return error.message.includes('Empty response');
        }
        
        const message = (error as any)?.message;
        return typeof message === 'string' &&
               message.includes('Empty response');
    }
    

    private getStatusCode(status: any): number {
        const parsed = Number(status);
        return isNaN(parsed) ? 400 : parsed;
    }

    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();

        if (this.isEnotfoundError(rpcError)) {
            return response.status(500).json({
                status: 500,
                message: 'Empty response from microservice (ENOTFOUND)',
            });
        }

        if (this.isEconnrefusedError(rpcError)) {
            return response.status(500).json({
                status: 500,
                message: 'Empty response from microservice (ECONNREFUSED)',
            });
        }

        if (this.isEmptyResponseException(rpcError)) {
            return response.status(502).json({
                status: 502,
                message: 'No response from microservice. Possibly not running or handler is missing.',
            });
        }

        if (this.isRpcErrorResponse(rpcError)) {
            const status = this.getStatusCode(rpcError.status);
            const message = typeof rpcError.message === 'string'
                ? rpcError.message
                : 'An unexpected error occurred';

            return response.status(status).json({ status, message });
        }
        console.log('Tipo:', typeof rpcError, 'Es Error:', rpcError instanceof Error);
        return response.status(400).json({
            status: 400,
            message: typeof rpcError === 'string' ? rpcError : 'Unknown RPC error',
        });
    }
}
