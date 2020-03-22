import { RpcError } from './rpc.error'

export class ParamsError extends RpcError {
	constructor(data) {
		super(-32602, 'Invalid params', data);
	}
}
