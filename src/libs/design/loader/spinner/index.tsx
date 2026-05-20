import { useTheme } from "@shopify/restyle";
import { BlurView } from "expo-blur";
import { CircleNotchIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { type LayoutChangeEvent, StyleSheet } from "react-native";
import Animated, {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";
import { EnumGap } from "../../../../themes/spacing";
import { HStack } from "../../../basics/hStack";
import { Icon } from "../../../basics/icon";
import { Text } from "../../../basics/text";
import { EnumTextVariant } from "../../../basics/text/props/variant/textVariant";
import { VStack } from "../../../basics/vStack";

type TypeSpinnerProps = {
	isActive?: boolean;
	text?: string;
};

type TypeSpinnerSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

const ICON_SIZES: Record<TypeSpinnerSize, number> = {
	xxs: 12,
	xs: 16,
	s: 22,
	m: 28,
	l: 40,
	xl: 56,
	xxl: 80,
};

function pickSpinnerSize(dim: number): TypeSpinnerSize {
	if (dim <= 60) return "xxs";
	if (dim <= 100) return "xs";
	if (dim <= 150) return "s";
	if (dim <= 250) return "m";
	if (dim <= 400) return "l";
	if (dim <= 600) return "xl";
	return "xxl";
}

export function Spinner({ isActive = true, text }: TypeSpinnerProps) {
	const _rotation = useSharedValue(0);
	const _theme = useTheme<TypeTheme>();

	const [_dim, _setDim] = useState({ width: 0, height: 0 });

	function handleLayout(event: LayoutChangeEvent) {
		const { width, height } = event.nativeEvent.layout;
		_setDim((prev) =>
			prev.width === width && prev.height === height ? prev : { width, height },
		);
	}

	const _smallDim = Math.min(_dim.width, _dim.height);
	const _sizeKey = pickSpinnerSize(_smallDim);
	const _iconWidth = ICON_SIZES[_sizeKey];
	const _textVariant = EnumTextVariant[_sizeKey].semibold;
	const _hasText = text !== undefined && text.length > 0;
	const _isHorizontal =
		_hasText && _dim.height > 0 && _dim.height < _iconWidth * 2.5;
	const Container = _isHorizontal ? HStack : VStack;

	useEffect(() => {
		if (!isActive) return;
		_rotation.value = 0;
		_rotation.value = withRepeat(
			withTiming(360, { duration: 1000, easing: Easing.linear }),
			-1,
			false,
		);
		return () => cancelAnimation(_rotation);
	}, [isActive, _rotation]);

	const _animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${_rotation.value}deg` }],
	}));

	if (!isActive) return null;

	return (
		<Container
			position={"absolute"}
			top={0}
			left={0}
			right={0}
			bottom={0}
			alignItems={"center"}
			justifyContent={"center"}
			gap={EnumGap.s}
			onLayout={handleLayout}
		>
			<BlurView intensity={5} tint={"light"} style={StyleSheet.absoluteFill} />
			<Animated.View style={_animatedStyle}>
				<Icon
					as={CircleNotchIcon}
					color={EnumColors.link.text}
					width={_iconWidth}
				/>
			</Animated.View>
			{_hasText && (
				<VStack alignSelf={"center"}>
					<Text variant={_textVariant} color={EnumColors.link.default}>
						{text}
					</Text>
				</VStack>
			)}
		</Container>
	);
}
