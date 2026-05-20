import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import { COLOR_SCHEMA_SELECTED } from "../../buttons/button/variant/enumButtonVariant";

export enum EnumTagVariant {
	solid = "solid",
	outline = "outline",
	ghost = "ghost",
}

export const tagVariantStyles = {
	[EnumTagVariant.solid]: {
		color: `${COLOR_SCHEMA_SELECTED}.a`,
		backgroundColor: `${COLOR_SCHEMA_SELECTED}.h`,
		borderColor: `${COLOR_SCHEMA_SELECTED}.h`,
	},
	[EnumTagVariant.outline]: {
		color: EnumColors.white.a,
		backgroundColor: `${COLOR_SCHEMA_SELECTED}.h`,
		borderColor: `${COLOR_SCHEMA_SELECTED}.h`,
	},
	[EnumTagVariant.ghost]: {
		color: `${COLOR_SCHEMA_SELECTED}.a`,
		backgroundColor: EnumColors.transparent,
		borderColor: `${COLOR_SCHEMA_SELECTED}.a`,
	},
};
