import { useTheme } from "@shopify/restyle";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import {
	type LayoutChangeEvent,
	StyleSheet,
	useColorScheme,
} from "react-native";
import Animated, {
	cancelAnimation,
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";
import { EnumGap, spacing } from "../../../../themes/spacing";
import { getShadow } from "../../../basics/box/utils/getShadow";
import { VStack } from "../../../basics/vStack";

type TypeSpinnerProps = {
	isActive?: boolean;
};

export function Skeleton({ isActive = true }: TypeSpinnerProps) {
	const _theme = useTheme<TypeTheme>();
	const _grayColor = _theme.colors["gray.a"];
	const _colorScheme = useColorScheme();
	const _pulse = useSharedValue(0);

	const [_dim, _setDim] = useState({ width: 0, height: 0 });

	function handleLayout(event: LayoutChangeEvent) {
		const { width, height } = event.nativeEvent.layout;
		_setDim((prev) =>
			prev.width === width && prev.height === height ? prev : { width, height },
		);
	}

	useEffect(() => {
		if (!isActive) return;
		_pulse.value = withRepeat(
			withSequence(
				withTiming(1, {
					duration: 500,
					easing: Easing.inOut(Easing.ease),
				}),
				withTiming(0, {
					duration: 1200,
					easing: Easing.inOut(Easing.ease),
				}),
			),
			-1,
			false,
		);
		return () => cancelAnimation(_pulse);
	}, [isActive, _pulse]);

	const _smallDim = Math.min(_dim.width, _dim.height);
	const _padding = Math.min(spacing.m, Math.max(0, _smallDim / 10));
	const _borderRadius = Math.min(spacing.m, Math.max(0, _smallDim / 8));
	const _shadow = getShadow({ shadowBottom: true }, _colorScheme);

	const _animatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(_pulse.value, [0, 1], [0.3, 0.8]),
	}));

	if (!isActive) return null;

	return (
		<VStack
			position={"absolute"}
			top={0}
			left={0}
			right={0}
			bottom={0}
			alignItems={"center"}
			justifyContent={"center"}
			gap={EnumGap.s}
			onLayout={handleLayout}
			style={{ padding: _padding }}
		>
			<BlurView intensity={3} tint={"light"} style={StyleSheet.absoluteFill} />
			<Animated.View
				style={[
					{
						width: "100%",
						height: "100%",
						backgroundColor: _grayColor,
						borderRadius: _borderRadius,
						...(_shadow as object),
					},
					_animatedStyle,
				]}
			/>
		</VStack>
	);
}
