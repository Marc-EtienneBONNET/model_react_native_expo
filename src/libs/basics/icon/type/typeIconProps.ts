import type { IconProps as PhIconProps } from "phosphor-react-native";
import type { ComponentType } from "react";
import type { TypeEnumColors } from "../../../../themes/colors/enum/enumColors";
import type { EnumIconSize } from "../../../../themes/iconSize";

export type TypeIconProps = Omit<PhIconProps, "size" | "color"> & {
	as: ComponentType<PhIconProps>;
	size?: EnumIconSize;
	width?: number;
	height?: number;
	color?: TypeEnumColors | string;
};
