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
			setScrollOffset(e.nativeEvent.contentOffset.y);
		},
		[],
	);

	const handleContentSizeChange = useCallback((_w: number, h: number) => {
		setContentSize(h);
	}, []);

	const handleLayout = useCallback((e: LayoutChangeEvent) => {
		setContainerSize(e.nativeEvent.layout.height);
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
