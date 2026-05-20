import { createBox } from "@shopify/restyle";
import {
	TouchableOpacity as RNTouchableOpacity,
	type TouchableOpacityProps as RNTouchableOpacityProps,
} from "react-native";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";

export const RestyleTouchableOpacity = createBox<
	TypeTheme,
	RNTouchableOpacityProps
>(RNTouchableOpacity);
