import { useTheme } from "@shopify/restyle";
import Svg, {
	Defs,
	Rect,
	Stop,
	LinearGradient as SvgLinearGradient,
} from "react-native-svg";
import {
	EnumColors,
	type TypeEnumColorValue,
} from "../../../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../../../themes/enum/typeTheme";
import { Box } from "../../../box";

type TypeFadeBlockProps = {
	color?: TypeEnumColorValue;
};

export function FadeBlockLeft({
	color = EnumColors.background,
}: TypeFadeBlockProps) {
	const theme = useTheme<TypeTheme>();
	const _fadeColor = theme.colors[color as keyof typeof theme.colors];
	return (
		<Box width={10} position={"absolute"} top={0} bottom={0} left={0}>
			<Svg width="100%" height={"100%"}>
				<Defs>
					<SvgLinearGradient id="fadeRL" x1="0" y1="0" x2="1" y2="0">
						<Stop offset="0" stopColor={_fadeColor} stopOpacity="1" />
						<Stop offset="1" stopColor={_fadeColor} stopOpacity="0" />
					</SvgLinearGradient>
				</Defs>
				<Rect width="100%" height={"100%"} fill="url(#fadeRL)" />
			</Svg>
		</Box>
	);
}
