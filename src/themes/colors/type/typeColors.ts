import type { TypePalette } from "./typePalette";

export type TypeColors = TypePalette & {
	background: string;
	text: string;
	link: {
		background: string;
		text: string;
	};
};
