import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { EnumColors } from "../../../themes/colors/enum/enumColors";
import { EnumRadius } from "../../../themes/radius";
import { EnumGap } from "../../../themes/spacing";
import type { TypeBoxColorKey } from "../../basics/box/type/otherTypeBox";
import { Text } from "../../basics/text";
import { EnumTextVariant } from "../../basics/text/props/variant/textVariant";
import { VStack } from "../../basics/vStack";
import type { TypeToastProps } from "./type/typeToastProps";
import { deepReplaceString } from "./utils/deepReplaceString";
import {
	COLOR_SCHEMA_SELECTED,
	EnumToastVariant,
} from "./variant/enumToastVariant";

const DEFAULT_DURATION_MS = 3000;
const BORDER_LEFT_WIDTH = 4;
const SLIDE_DURATION_MS = 250;
const OFF_SCREEN_X = Dimensions.get("window").width;

type TypeResolvedToastVariant = {
	color: TypeBoxColorKey;
	backgroundColor: TypeBoxColorKey;
	borderLeftColor: TypeBoxColorKey;
};

export function Toast({
	isOpen,
	onClose,
	title,
	subtitle,
	duration = DEFAULT_DURATION_MS,
	toastVariant = "solid",
	colorSchema = EnumColors.primary.default,
	...props
}: TypeToastProps) {
	const [_isMounted, _setIsMounted] = useState(false);
	const _translateX = useSharedValue(OFF_SCREEN_X);

	useEffect(() => {
		if (isOpen) {
			_setIsMounted(true);
			_translateX.value = withTiming(0, { duration: SLIDE_DURATION_MS });
		} else {
			_translateX.value = withTiming(
				OFF_SCREEN_X,
				{ duration: SLIDE_DURATION_MS },
				(finished) => {
					if (finished === true) runOnJS(_setIsMounted)(false);
				},
			);
		}
	}, [isOpen, _translateX]);

	useEffect(() => {
		if (!isOpen) return;
		const _timer = setTimeout(onClose, duration);
		return () => clearTimeout(_timer);
	}, [isOpen, duration, onClose]);

	const _animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: _translateX.value }],
	}));

	if (!_isMounted) return null;

	const _colorFamily = colorSchema.includes(".")
		? colorSchema.split(".")[0]
		: colorSchema;

	const _variant = deepReplaceString(
		EnumToastVariant[toastVariant],
		COLOR_SCHEMA_SELECTED,
		_colorFamily,
	) as unknown as TypeResolvedToastVariant;

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					top: 35,
					right: 10,
					zIndex: 1000,
					maxWidth: "70%",
				},
				_animatedStyle,
			]}
		>
			<VStack
				borderRadius={EnumRadius.xs}
				borderLeftWidth={BORDER_LEFT_WIDTH}
				padding={EnumGap.s}
				shadowBottom
				backgroundColor={_variant.backgroundColor}
				borderLeftColor={_variant.borderLeftColor}
				{...props}
			>
				<Text variant={EnumTextVariant.m.semibold} color={_variant.color}>
					{title}
				</Text>
				{subtitle !== undefined && (
					<Text variant={EnumTextVariant.m.light} color={_variant.color}>
						{subtitle}
					</Text>
				)}
			</VStack>
		</Animated.View>
	);
}
