export class MethodError {
	code: number
	message: string
	data: any

	constructor(methodName) {
		this.code = -32601
		this.message = 'Method not found'
		this.data = { methodName }
	}
}
