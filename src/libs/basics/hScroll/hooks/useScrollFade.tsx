import { useCallback, useState } from "react";
import type {
	LayoutChangeEvent,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from "react-native";

const SCROLL_THRESHOLD_PX = 2;

export function useScrollFade() {
	const [scrollOffset, setScrollOffset] = useState(0);
	const [contentSize, setContentSize] = useState(0);
	const [containerSize, setContainerSize] = useState(0);

	const handleScroll = useCallback(
		(e: NativeSyntheticEvent<NativeScrollEvent>) => {
			setScrollOffset(e.nativeEvent.contentOffset.x);
		},
		[],
	);

	const handleContentSizeChange = useCallback((w: number, _h: number) => {
		setContentSize(w);
	}, []);

	const handleLayout = useCallback((e: LayoutChangeEvent) => {
		setContainerSize(e.nativeEvent.layout.width);
	}, []);

	const canScroll = contentSize > containerSize + SCROLL_THRESHOLD_PX;
	const showStart = canScroll && scrollOffset > SCROLL_THRESHOLD_PX;
	const showEnd =
		canScroll &&
		scrollOffset + containerSize < contentSize - SCROLL_THRESHOLD_PX;

	return {
		showStart,
		showEnd,
		handleScroll,
		handleContentSizeChange,
		handleLayout,
	};
}
