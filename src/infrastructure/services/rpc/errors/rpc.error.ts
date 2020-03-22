export class RpcError {
	code: number
	message: string
	data: any

	constructor(code, message, data) {
		this.code = code
		this.message = message
		this.data = data
	}
}
