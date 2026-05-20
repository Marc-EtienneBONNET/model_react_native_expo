import type { Icon } from "phosphor-react-native";
import type { TypeEnumColorValue } from "../../../../../themes/colors/enum/enumColors";
import type { TypeTouchableOpacityProps } from "../../../../basics/touchableOpacity/type/typeTouchableOpacityProps";
import type { EnumButtonVariant } from "../variant/enumButtonVariant";

export type TypeButtonProps = TypeTouchableOpacityProps & {
	text?: string;
	buttonVariant?: keyof typeof EnumButtonVariant;
	colorSchema?: TypeEnumColorValue;
	isActive?: boolean;
	iconLeft?: Icon;
	iconRight?: Icon;
	iconCenter?: Icon;
	numberOfLines?: number;
};
