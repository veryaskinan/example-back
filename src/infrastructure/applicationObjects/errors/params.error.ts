export class ParamsError {
	code: number
	message: string
	data: any

	constructor(data) {
		this.code = -32602
		this.message = 'Invalid params'
		this.data = data
	}
}
