import {registerDecorator, ValidationOptions} from "class-validator";

export function IsNumberOrString(validationOptions?: ValidationOptions) {
	return function (object, propertyName) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					const type = typeof value
					return  type === "number" || type === "string"
				}
			}
		});
	};
}
