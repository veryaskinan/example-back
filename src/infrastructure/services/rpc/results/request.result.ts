import { MethodResult } from "./method.result";
import { RpcError } from "../errors/rpc.error";

export class RequestResult {
	jsonrpc: string
	result: object
	error: object
	id: bigint

	constructor(requeustId, result) {
		this.jsonrpc = '2.0'
		this.result = result instanceof MethodResult ? result : undefined
		this.error = result instanceof RpcError ? result : undefined
		this.id = requeustId
	}
}
