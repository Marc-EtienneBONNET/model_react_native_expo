import { EnumColors } from "../../../../../themes/colors/enum/enumColors";

export const COLOR_SCHEMA_SELECTED = "colorSchemaSelected";

export const EnumButtonVariant = {
	solid: {
		color: EnumColors.white.a,
		backgroundColor: COLOR_SCHEMA_SELECTED,
		borderColor: COLOR_SCHEMA_SELECTED,
	},
	outline: {
		color: COLOR_SCHEMA_SELECTED,
		backgroundColor: EnumColors.transparent,
		borderColor: COLOR_SCHEMA_SELECTED,
	},
	ghost: {
		color: COLOR_SCHEMA_SELECTED,
		backgroundColor: EnumColors.transparent,
		borderColor: EnumColors.transparent,
	},
	ghostSelected: {
		color: COLOR_SCHEMA_SELECTED,
		backgroundColor: EnumColors.transparent,
		borderColor: EnumColors.transparent,
	},
	link: {
		color: COLOR_SCHEMA_SELECTED,
		backgroundColor: EnumColors.transparent,
		borderColor: EnumColors.transparent,
	},
};
