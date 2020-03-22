import { RpcError } from './rpc.error'

export class RequestError extends RpcError {
	constructor(data) {
		super(-32600, 'Invalid Request', data);
	}
}
