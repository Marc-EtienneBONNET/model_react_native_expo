import { useColorScheme } from "react-native";
import { RestyleBox } from "./type/otherTypeBox";
import type { TypeBoxProps } from "./type/typeBoxProps";
import { getBorder } from "./utils/getBorder";
import { getShadow } from "./utils/getShadow";

export function Box({
	border,
	shadowTop = false,
	shadowBottom = false,
	shadowRight = false,
	shadowLeft = false,
	style,
	...props
}: TypeBoxProps) {
	const _colorScheme = useColorScheme();

	return (
		<RestyleBox
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
