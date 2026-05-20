import { palette } from "./palette";
import type { TypeColors } from "./type/typeColors";

export const colorsDark = {
	...palette,
	background: "rgba(31,31,34, 1)",
	text: palette.white.a,
	link: {
		background: palette.transparent,
		text: palette.sky.a,
	},
} as const satisfies TypeColors;
