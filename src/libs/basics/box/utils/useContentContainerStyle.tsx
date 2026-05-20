import { useTheme } from "@shopify/restyle";
import type { ViewStyle } from "react-native";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";

const SPACING_PROP_MAP: Record<string, keyof ViewStyle> = {
	gap: "gap",
	g: "gap",
	rowGap: "rowGap",
	rg: "rowGap",
	columnGap: "columnGap",
	cg: "columnGap",
	padding: "padding",
	p: "padding",
	paddingTop: "paddingTop",
	pt: "paddingTop",
	paddingBottom: "paddingBottom",
	pb: "paddingBottom",
	paddingLeft: "paddingLeft",
	pl: "paddingLeft",
	paddingRight: "paddingRight",
	pr: "paddingRight",
	paddingHorizontal: "paddingHorizontal",
	px: "paddingHorizontal",
	paddingVertical: "paddingVertical",
	py: "paddingVertical",
	paddingStart: "paddingStart",
	ps: "paddingStart",
	paddingEnd: "paddingEnd",
	pe: "paddingEnd",
};

const PASSTHROUGH_PROPS = new Set([
	"justifyContent",
	"alignItems",
	"alignContent",
	"flexWrap",
	"flexDirection",
]);

type TypeSplitResult<T> = {
	contentStyle: ViewStyle;
	outerProps: T;
};

export function useContentContainerStyle<T extends Record<string, unknown>>(
	props: T,
): TypeSplitResult<T> {
	const theme = useTheme<TypeTheme>();
	const contentStyle: Record<string, unknown> = {};
	const outerProps: Record<string, unknown> = {};

	for (const key of Object.keys(props)) {
		const val = props[key];
		if (val === undefined) continue;

		if (key in SPACING_PROP_MAP) {
			const styleKey = SPACING_PROP_MAP[key];
			const resolved =
				typeof val === "string"
					? ((theme.spacing as Record<string, number>)[val] ?? val)
					: val;
			contentStyle[styleKey] = resolved;
		} else if (PASSTHROUGH_PROPS.has(key)) {
			contentStyle[key] = val;
		} else {
			outerProps[key] = val;
		}
	}

	return {
		contentStyle: contentStyle as ViewStyle,
		outerProps: outerProps as T,
	};
}
