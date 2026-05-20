import type { TypeShadowProps } from "../type/typeShadowProps";

const SHADOW_OFFSETS = {
	top: { width: 2, height: -4 },
	bottom: { width: 2, height: 4 },
	right: { width: 4, height: 2 },
	left: { width: -4, height: 2 },
} as const;

export function getShadow(
	directions: TypeShadowProps,
	colorScheme: "dark" | "light" | undefined | null,
) {
	let offset: { width: number; height: number } | null = null;
	if (directions.shadowTop) offset = SHADOW_OFFSETS.top;
	else if (directions.shadowBottom) offset = SHADOW_OFFSETS.bottom;
	else if (directions.shadowRight) offset = SHADOW_OFFSETS.right;
	else if (directions.shadowLeft) offset = SHADOW_OFFSETS.left;

	if (!offset) return {};

	return {
		shadowColor: "#000",
		shadowOffset: offset,
		shadowOpacity: colorScheme === "dark" ? 0.7 : 0.1,
		shadowRadius: 8,
		elevation: 8,
	};
}
