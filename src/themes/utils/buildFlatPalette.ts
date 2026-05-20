import type { TypePalette } from "../colors/type/typePalette";

type TypeFlatPalette<T> = {
	[K in keyof T & string]: string;
} & {
	[P in keyof T & string as T[P] extends Record<string, unknown>
		? `${P}.${Extract<keyof T[P], string>}`
		: never]: string;
};

export function buildFlatPalette<T extends TypePalette>(
	palette: T,
): TypeFlatPalette<T> {
	const result: Record<string, string> = {};
	for (const [name, color] of Object.entries(palette)) {
		if (typeof color === "string") {
			result[name] = color;
		} else {
			const shades = color as Record<string, string>;
			result[name] =
				shades.a ?? shades.text ?? (Object.values(shades)[0] as string);
			for (const [shade, value] of Object.entries(shades)) {
				result[`${name}.${shade}`] = value;
			}
		}
	}
	return result as TypeFlatPalette<T>;
}
