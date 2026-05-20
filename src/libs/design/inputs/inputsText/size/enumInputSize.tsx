import { EnumGap } from "../../../../../themes/spacing";

export enum EnumInputSize {
	xs = "xs",
	s = "s",
	m = "m",
	l = "l",
	xl = "xl",
}

type TypeInputSizeConfig = {
	fontSize: number;
	paddingHorizontal: EnumGap;
	paddingVertical: EnumGap;
	helperVariant: "xxsNormal" | "xsNormal" | "sNormal" | "mNormal";
	titleVariant:
		| "xsSemibold"
		| "sSemibold"
		| "mSemibold"
		| "lSemibold"
		| "xlSemibold";
};

export const inputSizeStyles: Record<EnumInputSize, TypeInputSizeConfig> = {
	[EnumInputSize.xs]: {
		fontSize: 10,
		paddingHorizontal: EnumGap.xs,
		paddingVertical: EnumGap.xs,
		helperVariant: "xxsNormal",
		titleVariant: "xsSemibold",
	},
	[EnumInputSize.s]: {
		fontSize: 12,
		paddingHorizontal: EnumGap.s,
		paddingVertical: EnumGap.xs,
		helperVariant: "xsNormal",
		titleVariant: "sSemibold",
	},
	[EnumInputSize.m]: {
		fontSize: 14,
		paddingHorizontal: EnumGap.s,
		paddingVertical: EnumGap.xs,
		helperVariant: "xsNormal",
		titleVariant: "mSemibold",
	},
	[EnumInputSize.l]: {
		fontSize: 16,
		paddingHorizontal: EnumGap.s,
		paddingVertical: EnumGap.s,
		helperVariant: "sNormal",
		titleVariant: "lSemibold",
	},
	[EnumInputSize.xl]: {
		fontSize: 18,
		paddingHorizontal: EnumGap.m,
		paddingVertical: EnumGap.s,
		helperVariant: "mNormal",
		titleVariant: "xlSemibold",
	},
};
