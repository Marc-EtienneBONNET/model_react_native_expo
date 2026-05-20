import { useTheme } from "@shopify/restyle";
import { EnumColors } from "../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../themes/enum/typeTheme";
import { iconSize } from "../../../themes/iconSize";
import type { TypeIconProps } from "./type/typeIconProps";

const DEFAULT_SIZE = iconSize.m;

export function Icon({
	as: As,
	size,
	width,
	height,
	color,
	...props
}: TypeIconProps) {
	const _theme = useTheme<TypeTheme>();
	const _size =
		(size !== undefined ? iconSize[size] : undefined) ??
		width ??
		height ??
		DEFAULT_SIZE;
	const _colorKey = (color ?? EnumColors.text) as keyof typeof _theme.colors;
	const _resolvedColor = _theme.colors[_colorKey] as string;

	return <As size={_size} color={_resolvedColor} {...props} />;
}
