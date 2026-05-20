import { useColorScheme } from "react-native";
import { getBorder } from "../box/utils/getBorder";
import { getShadow } from "../box/utils/getShadow";
import { useContentContainerStyle } from "../box/utils/useContentContainerStyle";
import { VStack } from "../vStack";
import { FadeBlockBottom } from "./components/fadeBlock/fadeBlockBottom";
import { FadeBlockTop } from "./components/fadeBlock/fadeBlockTop";
import { useScrollFade } from "./hooks/useScrollFade";
import { RestyleVScroll } from "./type/otherTypeVScroll";
import type { TypeVScrollProps } from "./type/typeVScrollProps";

export function VScroll({
	border,
	shadowTop = false,
	shadowBottom = false,
	shadowRight = false,
	shadowLeft = false,
	style,
	contentContainerStyle,
	colorFade,
	onScroll,
	onContentSizeChange,
	onLayout,
	...props
}: TypeVScrollProps) {
	const _colorScheme = useColorScheme();
	const { contentStyle, outerProps } = useContentContainerStyle(props);
	const fade = useScrollFade();

	return (
		<VStack position="relative">
			<RestyleVScroll
				keyboardShouldPersistTaps="handled"
				automaticallyAdjustKeyboardInsets={true}
				contentInsetAdjustmentBehavior="automatic"
				{...outerProps}
				{...getBorder(border)}
				contentContainerStyle={[
					{ flexDirection: "column" },
					contentStyle,
					contentContainerStyle,
				]}
				style={[
					getShadow(
						{ shadowTop, shadowBottom, shadowRight, shadowLeft },
						_colorScheme,
					),
					style,
				]}
				onScroll={(e) => {
					fade.handleScroll(e);
					onScroll?.(e);
				}}
				onContentSizeChange={(w, h) => {
					fade.handleContentSizeChange(w, h);
					onContentSizeChange?.(w, h);
				}}
				onLayout={(e) => {
					fade.handleLayout(e);
					onLayout?.(e);
				}}
				scrollEventThrottle={16}
			/>
			{fade.showStart && <FadeBlockTop color={colorFade} />}
			{fade.showEnd && <FadeBlockBottom color={colorFade} />}
		</VStack>
	);
}
