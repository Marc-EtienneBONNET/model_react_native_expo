import { createText } from "@shopify/restyle";
import { type ComponentProps, useEffect, useState } from "react";
import type {
	LayoutChangeEvent,
	NativeSyntheticEvent,
	TextLayoutEventData,
	TextLayoutLine,
} from "react-native";
import type { TypeTheme } from "../../../themes/enum/typeTheme";
import { VStack } from "../vStack";

const RestyleText = createText<TypeTheme>();

type TypeTextProps = ComponentProps<typeof RestyleText>;

export function Text({ children, ...props }: TypeTextProps) {
	const [containerHeight, setContainerHeight] = useState<number | null>(null);
	const [naturalLines, setNaturalLines] = useState<TextLayoutLine[] | null>(
		null,
	);

	useEffect(() => {
		setNaturalLines(null);
	}, [children]);

	function handleLayout(event: LayoutChangeEvent) {
		setContainerHeight(event.nativeEvent.layout.height);
	}

	function handleTextLayout(event: NativeSyntheticEvent<TextLayoutEventData>) {
		const _next = event.nativeEvent.lines;
		if (naturalLines === null || _next.length > naturalLines.length)
			setNaturalLines(_next);
	}

	const _numberOfLines = computeNumberOfLines(naturalLines, containerHeight);

	return (
		<VStack
			maxWidth={"100%"}
			maxHeight={"100%"}
			alignSelf={"flex-start"}
			overflow={"hidden"}
			flexShrink={1}
			onLayout={handleLayout}
		>
			<RestyleText
				numberOfLines={_numberOfLines}
				ellipsizeMode={"tail"}
				onTextLayout={handleTextLayout}
				{...props}
			>
				{children}
			</RestyleText>
		</VStack>
	);
}

function computeNumberOfLines(
	lines: TextLayoutLine[] | null,
	containerHeight: number | null,
): number | undefined {
	if (lines === null || containerHeight === null) return undefined;
	let _count = 0;
	for (const _line of lines) {
		if (_line.y + _line.height > containerHeight + 0.5) break;
		_count += 1;
	}
	return Math.max(1, _count);
}
