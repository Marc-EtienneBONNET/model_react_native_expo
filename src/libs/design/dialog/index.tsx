import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { EnumColors } from "../../../themes/colors/enum/enumColors";
import { EnumRadius } from "../../../themes/radius";
import { EnumGap } from "../../../themes/spacing";
import { TouchableOpacity } from "../../basics/touchableOpacity";
import type { TypeDialogProps } from "./type/typeDialogProps";

const SLIDE_DURATION_MS = 250;
const OFF_SCREEN_Y = Dimensions.get("window").height;

export function Dialog({
	isOpen,
	onClose,
	children,
	canClose = true,
	...props
}: TypeDialogProps) {
	const [_isMounted, _setIsMounted] = useState(false);
	const _translateY = useSharedValue(OFF_SCREEN_Y);

	useEffect(() => {
		if (isOpen) {
			_setIsMounted(true);
			_translateY.value = withTiming(0, { duration: SLIDE_DURATION_MS });
		} else {
			_translateY.value = withTiming(
				OFF_SCREEN_Y,
				{ duration: SLIDE_DURATION_MS },
				(finished) => {
					if (finished === true) runOnJS(_setIsMounted)(false);
				},
			);
		}
	}, [isOpen, _translateY]);

	const _animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: _translateY.value }],
	}));

	if (!_isMounted) return null;

	return (
		<>
			<BlurView intensity={5} style={StyleSheet.absoluteFill} />
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					canClose === true && onClose();
				}}
				position={"absolute"}
				top={0}
				left={0}
				right={0}
				bottom={0}
				justifyContent={"flex-end"}
			>
				<Animated.View
					style={[{ width: "100%", height: "70%" }, _animatedStyle]}
				>
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {}}
						height={"100%"}
						width={"100%"}
						backgroundColor={EnumColors.background}
						borderRadius={EnumRadius.m}
						padding={EnumGap.m}
						shadowTop
						{...props}
					>
						{children}
					</TouchableOpacity>
				</Animated.View>
			</TouchableOpacity>
		</>
	);
}
