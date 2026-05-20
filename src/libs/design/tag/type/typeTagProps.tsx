import type { Icon } from "phosphor-react-native";
import type { EnumColors } from "../../../../themes/colors/enum/enumColors";
import type { TypeBoxProps } from "../../../basics/box/type/typeBoxProps";
import type { EnumTagVariant } from "../variant/enumTagVariant";

export type TypeTagProps = TypeBoxProps & {
	text?: string;
	tagVariant?: EnumTagVariant;
	colorSchema?: keyof typeof EnumColors;
	leftIcon?: Icon;
	rightIcon?: Icon;
	centerIcon?: Icon;
};
