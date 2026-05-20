import { colorsLight } from "../colorLight";

type TypeColorsLight = typeof colorsLight;

export type TypeEnumColors = {
	[K in keyof TypeColorsLight & string]: TypeColorsLight[K] extends string
		? K
		: { [S in keyof TypeColorsLight[K] & string]: `${K}.${S}` } & {
				default: K;
			};
};

export type TypeEnumColorValue = {
	[K in keyof TypeEnumColors]: TypeEnumColors[K] extends string
		? TypeEnumColors[K]
		: TypeEnumColors[K] extends Record<string, string>
			? TypeEnumColors[K][keyof TypeEnumColors[K]]
			: never;
}[keyof TypeEnumColors];

export const EnumColors = Object.fromEntries(
	Object.entries(colorsLight).map(([name, color]) => {
		if (typeof color === "string") return [name, name];
		const shades = Object.fromEntries(
			Object.keys(color).map((shade) => [shade, `${name}.${shade}`]),
		);
		return [name, { ...shades, default: name }];
	}),
) as TypeEnumColors;
