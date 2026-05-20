import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import type { TypeBoxColorKey } from "../../../basics/box/type/otherTypeBox";
import { HStack } from "../../../basics/hStack";
import { Icon } from "../../../basics/icon";
import { Text } from "../../../basics/text";
import { TouchableOpacity } from "../../../basics/touchableOpacity";
import { VStack } from "../../../basics/vStack";
import { useTranslation } from "../../../i18n";
import type { TypeButtonProps } from "./type/typeButtonProps";
import { deepReplaceString } from "./utils/deepReplaceString";
import {
	COLOR_SCHEMA_SELECTED,
	EnumButtonVariant,
} from "./variant/enumButtonVariant";

type TypeResolvedButtonVariant = {
	color: TypeBoxColorKey;
	backgroundColor: TypeBoxColorKey;
	borderColor: TypeBoxColorKey;
};

export function Button({
	text,
	buttonVariant = "solid",
	colorSchema = EnumColors.primary.a,
	isActive = false,
	iconLeft,
	iconRight,
	iconCenter,
	numberOfLines,
	...props
}: TypeButtonProps) {
	const t = useTranslation("libs/button");
	if (iconCenter !== undefined && text !== undefined) {
		throw new Error(t("errorIconCenterWithText"));
	}

	const _resolvedVariantKey =
		buttonVariant === "ghostSelected"
			? isActive
				? "solid"
				: "ghost"
			: buttonVariant;

	const _variant = deepReplaceString(
		EnumButtonVariant[_resolvedVariantKey],
		COLOR_SCHEMA_SELECTED,
		colorSchema,
	) as unknown as TypeResolvedButtonVariant;

	const _isLink = _resolvedVariantKey === "link";

	return (
		<TouchableOpacity
			{...(_isLink ? {} : { padding: EnumGap.s })}
			borderRadius={EnumRadius.s}
			borderWidth={_isLink ? 0 : 1}
			borderStyle={"solid"}
			backgroundColor={_variant.backgroundColor}
			borderColor={_variant.borderColor}
			{...props}
		>
			<HStack gap={EnumGap.s} alignItems={"center"} justifyContent={"center"}>
				{iconLeft && <Icon as={iconLeft} color={_variant.color} />}
				{iconCenter && <Icon as={iconCenter} color={_variant.color} />}
				{text !== undefined && (
					<VStack alignSelf={"center"} flexShrink={1} minWidth={0}>
						<Text
							color={_variant.color}
							numberOfLines={numberOfLines}
							style={_isLink ? { textDecorationLine: "underline" } : undefined}
						>
							{text}
						</Text>
					</VStack>
				)}
				{iconRight && <Icon as={iconRight} color={_variant.color} />}
			</HStack>
		</TouchableOpacity>
	);
}
