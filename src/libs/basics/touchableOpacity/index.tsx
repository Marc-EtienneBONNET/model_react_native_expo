import { useColorScheme } from "react-native";
import { getBorder } from "../box/utils/getBorder";
import { getShadow } from "../box/utils/getShadow";
import { RestyleTouchableOpacity } from "./type/otherTypeTouchableOpacity";
import type { TypeTouchableOpacityProps } from "./type/typeTouchableOpacityProps";

export function TouchableOpacity({
	border,
	shadowTop = false,
	shadowBottom = false,
	shadowRight = false,
	shadowLeft = false,
	style,
	...props
}: TypeTouchableOpacityProps) {
	const _colorScheme = useColorScheme();

	return (
		<RestyleTouchableOpacity
			{...props}
			{...getBorder(border)}
			style={[
				getShadow(
					{ shadowTop, shadowBottom, shadowRight, shadowLeft },
					_colorScheme,
				),
				style,
			]}
		/>
	);
}
