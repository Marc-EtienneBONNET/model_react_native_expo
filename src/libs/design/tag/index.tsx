import { EnumColors } from "../../../themes/colors/enum/enumColors";
import { EnumRadius } from "../../../themes/radius";
import { EnumGap } from "../../../themes/spacing";
import { Box } from "../../basics/box";
import type { TypeBoxColorKey } from "../../basics/box/type/otherTypeBox";
import { HStack } from "../../basics/hStack";
import { Icon } from "../../basics/icon";
import { Text } from "../../basics/text";
import { VStack } from "../../basics/vStack";
import { useTranslation } from "../../i18n";
import { deepReplaceString } from "../toast/utils/deepReplaceString";
import { COLOR_SCHEMA_SELECTED } from "../toast/variant/enumToastVariant";
import type { TypeTagProps } from "./type/typeTagProps";
import { EnumTagVariant, tagVariantStyles } from "./variant/enumTagVariant";

type TypeResolvedTagVariant = {
	color: TypeBoxColorKey;
	backgroundColor: TypeBoxColorKey;
	borderColor: TypeBoxColorKey;
};

export function Tag({
	text,
	tagVariant = EnumTagVariant.solid,
	colorSchema = EnumColors.primary.default,
	leftIcon,
	rightIcon,
	centerIcon,
	...props
}: TypeTagProps) {
	const t = useTranslation("libs/tag");
	if (centerIcon !== undefined && text !== undefined) {
		throw new Error(t("errorCenterIconWithText"));
	}

	const _variant = deepReplaceString(
		tagVariantStyles[tagVariant],
		COLOR_SCHEMA_SELECTED,
		colorSchema,
	) as unknown as TypeResolvedTagVariant;

	return (
		<Box
			alignSelf={"flex-start"}
			maxWidth={"100%"}
			padding={EnumGap.xs}
			borderRadius={EnumRadius.s}
			borderWidth={1}
			borderStyle={"solid"}
			backgroundColor={_variant.backgroundColor}
			borderColor={_variant.borderColor}
			{...props}
		>
			<HStack gap={EnumGap.xs} alignItems={"center"} justifyContent={"center"}>
				{leftIcon && <Icon as={leftIcon} color={_variant.color} />}
				{centerIcon && <Icon as={centerIcon} color={_variant.color} />}
				{text !== undefined && (
					<VStack alignSelf={"center"} flexShrink={1} minWidth={0}>
						<Text color={_variant.color} numberOfLines={1}>
							{text}
						</Text>
					</VStack>
				)}
				{rightIcon && <Icon as={rightIcon} color={_variant.color} />}
			</HStack>
		</Box>
	);
}
