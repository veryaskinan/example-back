import { RpcError } from './rpc.error'

export class MethodError extends RpcError {
	constructor(methodName) {
		super(-32601, 'Method not found', { methodName });
	}
}
