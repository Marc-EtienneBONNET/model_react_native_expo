import { palette } from "./palette";
import type { TypeColors } from "./type/typeColors";

export const colorsLight = {
	...palette,
	background: "rgba(250, 250, 248, 1)",
	text: palette.primary.a,
	link: {
		background: palette.transparent,
		text: palette.blue.a,
	},
} as const satisfies TypeColors;
