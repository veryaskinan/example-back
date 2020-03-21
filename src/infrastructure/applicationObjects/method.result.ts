export class MethodResult {
	constructor(result) {
		for (const key in result) {
			this[key] = result[key]
		}
	}
}
