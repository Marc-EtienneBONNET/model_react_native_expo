import { textVariant } from "../libs/basics/text/props/variant/textVariant";
import { colorsDark } from "./colors/colorsDark";
import { lightTheme } from "./lightTheme";
import { buildFlatPalette } from "./utils/buildFlatPalette";

const flatPaletteDark = buildFlatPalette(colorsDark);

export const darkTheme = {
	...lightTheme,
	colors: {
		...flatPaletteDark,
	},
	textVariants: {
		...textVariant,
		defaults: textVariant.sNormal,
	},
};
