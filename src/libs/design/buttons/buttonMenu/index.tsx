import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";
import {
	Children,
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	Dimensions,
	type GestureResponderEvent,
	type LayoutChangeEvent,
	Pressable,
	ScrollView,
	View,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import { VStack } from "../../../basics/vStack";
import { useTranslation } from "../../../i18n";
import { Button } from "../button";
import type { TypeButtonProps } from "../button/type/typeButtonProps";
import { EnumButtonMenuVariant } from "./variant/enumButtonMenuVariant";

type TypeButtonMenuProps = Omit<TypeButtonProps, "iconRight" | "onPress"> & {
	children?: ReactNode;
	withChevron?: boolean;
};

const PANEL_MAX_HEIGHT = 200;
const PANEL_GAP = 4;
const OVERLAY_REACH = 2000;
const SCREEN_EDGE_MARGIN = 8;
const ANIMATION_DURATION_MS = 180;

export function ButtonMenu({
	children,
	withChevron = true,
	...props
}: TypeButtonMenuProps) {
	const t = useTranslation("libs/buttonMenu");
	const [_isOpen, _setIsOpen] = useState(false);
	const [_openAbove, _setOpenAbove] = useState(false);
	const [_alignRight, _setAlignRight] = useState(true);
	const [_panelWidth, _setPanelWidth] = useState<number | undefined>(undefined);
	const _containerRef = useRef<View>(null);
	const _progress = useSharedValue(0);

	const _wrappedChildren = Children.map(children, (child) => {
		if (!isValidElement(child)) {
			throw new Error(t("errorChildInvalidReactElement"));
		}
		if (child.type !== Button) {
			throw new Error(t("errorChildMustBeButton"));
		}
		const _typedChild = child as ReactElement<TypeButtonProps>;
		const _originalOnPress = _typedChild.props.onPress;
		return cloneElement(_typedChild, {
			variant: _typedChild.props.variant ?? EnumButtonMenuVariant.ghost,
			numberOfLines: _typedChild.props.numberOfLines ?? 1,
			onPress: (event: GestureResponderEvent) => {
				_originalOnPress?.(event);
				_setIsOpen(false);
			},
		});
	});

	useEffect(() => {
		if (!_isOpen) {
			_setPanelWidth(undefined);
			return;
		}
		if (_panelWidth === undefined) return;
		_progress.value = 0;
		_progress.value = withTiming(1, {
			duration: ANIMATION_DURATION_MS,
			easing: Easing.out(Easing.ease),
		});
	}, [_isOpen, _panelWidth, _progress]);

	function handlePress() {
		if (!_isOpen && _containerRef.current !== null) {
			_containerRef.current.measureInWindow((_x, y, _w, height) => {
				const _screenHeight = Dimensions.get("window").height;
				const _spaceBelow = _screenHeight - (y + height);
				_setOpenAbove(_spaceBelow < PANEL_MAX_HEIGHT + PANEL_GAP);
			});
		}
		_setIsOpen((v) => !v);
	}

	function handleMeasureLayout(event: LayoutChangeEvent) {
		const _width = event.nativeEvent.layout.width;
		if (_width <= 0 || _width === _panelWidth) return;
		if (_containerRef.current === null) {
			_setPanelWidth(_width);
			return;
		}
		_containerRef.current.measureInWindow((x, _y, w, _h) => {
			const _screenWidth = Dimensions.get("window").width;
			const _fitsAlignedLeft = x + _width <= _screenWidth - SCREEN_EDGE_MARGIN;
			const _fitsAlignedRight = x + w - _width >= SCREEN_EDGE_MARGIN;
			_setAlignRight(!_fitsAlignedLeft && _fitsAlignedRight);
			_setPanelWidth(_width);
		});
	}

	const _animatedStyle = useAnimatedStyle(() => ({
		opacity: _progress.value,
		transform: [{ scaleY: _progress.value }],
	}));

	return (
		<View ref={_containerRef} style={{ position: "relative" }}>
			<Button
				{...props}
				iconRight={
					withChevron ? (_isOpen ? CaretUpIcon : CaretDownIcon) : undefined
				}
				onPress={handlePress}
			/>
			{_isOpen && (
				<>
					<Pressable
						onPress={() => _setIsOpen(false)}
						style={{
							position: "absolute",
							top: -OVERLAY_REACH,
							left: -OVERLAY_REACH,
							right: -OVERLAY_REACH,
							bottom: -OVERLAY_REACH,
							zIndex: 999,
						}}
					/>
					{_panelWidth === undefined && (
						<View
							pointerEvents={"none"}
							onLayout={handleMeasureLayout}
							style={{
								position: "absolute",
								top: -OVERLAY_REACH,
								left: 0,
								opacity: 0,
							}}
						>
							<VStack gap={EnumGap.xs}>{_wrappedChildren}</VStack>
						</View>
					)}
					{_panelWidth !== undefined && (
						<Animated.View
							style={[
								{
									position: "absolute",
									...(_alignRight ? { right: 0 } : { left: 0 }),
									width: _panelWidth,
									zIndex: 1000,
									transformOrigin: _openAbove ? "bottom" : "top",
									...(_openAbove
										? { bottom: "100%", marginBottom: PANEL_GAP }
										: { top: "100%", marginTop: PANEL_GAP }),
								},
								_animatedStyle,
							]}
						>
							<VStack
								backgroundColor={EnumColors.background}
								borderRadius={EnumRadius.s}
								shadowBottom
							>
								<ScrollView style={{ maxHeight: PANEL_MAX_HEIGHT }}>
									<VStack gap={EnumGap.xs}>{_wrappedChildren}</VStack>
								</ScrollView>
							</VStack>
						</Animated.View>
					)}
				</>
			)}
		</View>
	);
}
