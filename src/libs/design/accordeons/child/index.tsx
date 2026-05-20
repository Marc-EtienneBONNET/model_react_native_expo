import {
	CaretDownIcon,
	CaretUpIcon,
	type Icon as TypeIcon,
} from "phosphor-react-native";
import { useContext } from "react";
import type { GestureResponderEvent } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";
import { EnumIconSize } from "../../../../themes/iconSize";
import { EnumGap } from "../../../../themes/spacing";
import type { TypeBoxColorKey } from "../../../basics/box/type/otherTypeBox";
import { HStack } from "../../../basics/hStack";
import { Icon } from "../../../basics/icon";
import { Text } from "../../../basics/text";
import { EnumTextVariant } from "../../../basics/text/props/variant/textVariant";
import { TouchableOpacity } from "../../../basics/touchableOpacity";
import type { TypeTouchableOpacityProps } from "../../../basics/touchableOpacity/type/typeTouchableOpacityProps";
import { VStack } from "../../../basics/vStack";
import type { TypeVStackProps } from "../../../basics/vStack/type/typeVStackProps";
import { useTranslation } from "../../../i18n";
import { ContextAccordeonParent } from "../parent/contextAccordeonParent";

export type TypeAccordeonChildHeaderStyle = TypeTouchableOpacityProps & {
	color?: TypeBoxColorKey;
	size?: EnumIconSize;
};

export type TypeAccordeonChildProps = TypeVStackProps & {
	index?: number;
	text: string;
	leftIcon?: TypeIcon;
	headerStyle?: TypeAccordeonChildHeaderStyle;
};

const ANIMATION_DURATION = 250;

export function AccordeonChild({
	index,
	text,
	leftIcon,
	headerStyle,
	children,
	...props
}: TypeAccordeonChildProps) {
	const t = useTranslation("libs/accordeons");
	const _context = useContext(ContextAccordeonParent);
	if (_context === null) {
		throw new Error(t("errorChildOutsideParent"));
	}
	const { values, setValue } = _context;
	const _isOpen = index !== undefined ? values[index] === true : false;

	const {
		color: _headerColor,
		size: _headerIconSize,
		onPress: _userOnPress,
		...restHeaderStyle
	} = headerStyle ?? {};

	function handleToggle() {
		if (index === undefined) return;
		setValue(index, !_isOpen);
	}

	function handleHeaderPress(event: GestureResponderEvent) {
		_userOnPress?.(event);
		handleToggle();
	}

	const _iconSize = _headerIconSize ?? EnumIconSize.l;

	return (
		<Animated.View layout={LinearTransition.duration(ANIMATION_DURATION)}>
			<VStack flexShrink={0}>
				<TouchableOpacity
					activeOpacity={0.7}
					{...restHeaderStyle}
					onPress={handleHeaderPress}
				>
					<HStack gap={EnumGap.s} alignItems={"center"} padding={EnumGap.s}>
						{leftIcon !== undefined && (
							<Icon as={leftIcon} size={_iconSize} color={_headerColor} />
						)}
						<VStack flex={1}>
							<Text variant={EnumTextVariant.l.normal} color={_headerColor}>
								{text}
							</Text>
						</VStack>
						<Icon
							as={_isOpen ? CaretUpIcon : CaretDownIcon}
							size={_iconSize}
							color={_headerColor}
						/>
					</HStack>
				</TouchableOpacity>
				{_isOpen && (
					<Animated.View
						entering={FadeIn.duration(ANIMATION_DURATION)}
						exiting={FadeOut.duration(ANIMATION_DURATION)}
					>
						<VStack padding={EnumGap.s} {...props}>
							{children}
						</VStack>
					</Animated.View>
				)}
			</VStack>
		</Animated.View>
	);
}
