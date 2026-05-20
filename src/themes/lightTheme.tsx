import { createTheme } from "@shopify/restyle";
import { textVariant } from "../libs/basics/text/props/variant/textVariant";
import { colorsLight } from "./colors/colorLight";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { buildFlatPalette } from "./utils/buildFlatPalette";

const flatPaletteLight = buildFlatPalette(colorsLight);

export const lightTheme = createTheme({
	colors: {
		...flatPaletteLight,
	},
	spacing: spacing,
	borderRadii: radius,
	textVariants: {
		...textVariant,
		defaults: textVariant.sNormal,
	},
	breakpoints: {},
});
