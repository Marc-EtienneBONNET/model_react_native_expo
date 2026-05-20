import { EnumColors } from "../../../../themes/colors/enum/enumColors";

export const COLOR_SCHEMA_SELECTED = "colorSchemaSelected";

export const EnumToastVariant = {
	solid: {
		color: `${COLOR_SCHEMA_SELECTED}.a`,
		backgroundColor: EnumColors.background,
		borderLeftColor: `${COLOR_SCHEMA_SELECTED}.a`,
	},
	outline: {
		color: `${COLOR_SCHEMA_SELECTED}.a`,
		backgroundColor: EnumColors.background,
		borderLeftColor: `${COLOR_SCHEMA_SELECTED}.a`,
	},
	ghost: {
		color: `${COLOR_SCHEMA_SELECTED}.a`,
		backgroundColor: EnumColors.background,
		borderLeftColor: EnumColors.transparent,
	},
};
