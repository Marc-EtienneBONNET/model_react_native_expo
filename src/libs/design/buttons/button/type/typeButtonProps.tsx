import type { Icon } from "phosphor-react-native";
import type { TypeEnumColorValue } from "../../../../../themes/colors/enum/enumColors";
import type { TypeTouchableOpacityProps } from "../../../../basics/touchableOpacity/type/typeTouchableOpacityProps";
import type { ButtonVariant } from "../variant/buttonVariant";

export type TypeButtonProps = TypeTouchableOpacityProps & {
	text?: string;
	variant?: keyof typeof ButtonVariant;
	colorSchema?: TypeEnumColorValue;
	isActive?: boolean;
	iconLeft?: Icon;
	iconRight?: Icon;
	iconCenter?: Icon;
	numberOfLines?: number;
};
