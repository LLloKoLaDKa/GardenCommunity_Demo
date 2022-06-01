export const nullToStringEmpty = (value?: string | null): string => {
	if (value == null) return '';

	return value;
};

export const isNullOrEmpty = (value?: string | null): boolean => {
	return value == null || value == undefined || value == '';
};

export const isNullOrWhiteSpace = (str?: string | null): boolean => {
	return str === undefined || str === null
							 || typeof str !== 'string'
							 || str.match(/^ *$/) !== null;
};

export const valueOrPlaceholder = (value?: any | null, placeholder: string = ''): string => {
	if (!value) return placeholder;

	return value;
};

export function replaceParams(expression: string, args: { [key: string]: string | null; }): string {
	if (isNullOrEmpty(expression)) return '';

	for (var key in args) {
		if (args.hasOwnProperty(key)) expression = expression.replace(new RegExp('\\{' + key + '\\}', 'g'), args[key] || '');
	}

	return expression;
};

export const valueNumber = (value: number | null): number | '' => {
	return value === null || isNaN(value) ? '' : value;
}

export const format = (format: string, ...data: any[]) => format.replace(/{(\d+)}/g, (match, number) => {
	return typeof data[number] != 'undefined'
		? data[number]
		: match;
});