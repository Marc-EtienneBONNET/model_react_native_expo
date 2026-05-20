import { useColorScheme } from "react-native";
import { getBorder } from "../box/utils/getBorder";
import { getShadow } from "../box/utils/getShadow";
import { useContentContainerStyle } from "../box/utils/useContentContainerStyle";
import { HStack } from "../hStack";
import { FadeBlockLeft } from "./components/fadeBlock/fadeBlockLeft";
import { FadeBlockRight } from "./components/fadeBlock/fadeBlockRight";
import { useScrollFade } from "./hooks/useScrollFade";
import { RestyleHScroll } from "./type/otherTypeHScroll";
import type { TypeHScrollProps } from "./type/typeHScrollProps";

export function HScroll({
	border,
	shadowTop = false,
	shadowBottom = false,
	shadowRight = false,
	shadowLeft = false,
	style,
	horizontal = true,
	contentContainerStyle,
	colorFade,
	onScroll,
	onContentSizeChange,
	onLayout,
	...props
}: TypeHScrollProps) {
	const _colorScheme = useColorScheme();
	const { contentStyle, outerProps } = useContentContainerStyle(props);
	const fade = useScrollFade();

	const hasSizingOverride =
		"flex" in props ||
		"flexGrow" in props ||
		"flexShrink" in props ||
		"alignSelf" in props ||
		"height" in props;

	return (
		<HStack position="relative">
			<RestyleHScroll
				horizontal={horizontal}
				{...getBorder(border)}
				contentContainerStyle={[
					{ flexDirection: "row" },
					contentStyle,
					contentContainerStyle,
				]}
				style={[
					hasSizingOverride
						? null
						: { flexGrow: 0, flexShrink: 0, alignSelf: "flex-start" },
					getShadow(
						{ shadowTop, shadowBottom, shadowRight, shadowLeft },
						_colorScheme,
					),
					style,
				]}
				{...outerProps}
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
			{fade.showStart && <FadeBlockLeft color={colorFade} />}
			{fade.showEnd && <FadeBlockRight color={colorFade} />}
		</HStack>
	);
}
