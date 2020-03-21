export class RequestError {
	code: number
	message: string
	data: any

	constructor(data) {
		this.code = -32600
		this.message = 'Invalid Request'
		this.data = data
	}
}
