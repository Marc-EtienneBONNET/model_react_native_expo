import { HouseIcon } from "phosphor-react-native";
import { HScroll } from "../../libs/basics/hScroll";
import { HStack } from "../../libs/basics/hStack";
import { VStack } from "../../libs/basics/vStack";
import { Tag } from "../../libs/design/tag";
import { EnumTagVariant } from "../../libs/design/tag/variant/enumTagVariant";
import { useTranslation } from "../../libs/i18n";
import { EnumColors } from "../../themes/colors/enum/enumColors";
import { EnumGap } from "../../themes/spacing";

export function PageTag() {
	const t = useTranslation("pages/tag");

	return (
		<VStack
			flex={1}
			height={"100%"}
			width={"100%"}
			gap={EnumGap.l}
			padding={EnumGap.m}
		>
			<HStack gap={EnumGap.s}>
				<Tag
					flex={1}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					colorSchema={EnumColors.success.default}
				/>

				<Tag
					flex={1}
					colorSchema={EnumColors.destructive.default}
					text={t("longTag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
				/>
				<Tag
					flex={1}
					colorSchema={EnumColors.purple.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
				/>
			</HStack>
			<HStack gap={EnumGap.s}>
				<Tag
					flex={1}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					colorSchema={EnumColors.success.default}
				/>
			</HStack>
			<HStack gap={EnumGap.s}>
				<Tag
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					colorSchema={EnumColors.success.default}
				/>
			</HStack>
			<HScroll gap={EnumGap.s}>
				<Tag text={t("tag")} leftIcon={HouseIcon} rightIcon={HouseIcon} />
				<Tag
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					colorSchema={EnumColors.success.default}
				/>

				<Tag
					colorSchema={EnumColors.destructive.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
				/>
				<Tag
					colorSchema={EnumColors.purple.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
				/>
			</HScroll>
			<HScroll gap={EnumGap.s}>
				<Tag
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					tagVariant={EnumTagVariant.outline}
				/>
				<Tag
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					colorSchema={EnumColors.success.default}
					tagVariant={EnumTagVariant.outline}
				/>

				<Tag
					colorSchema={EnumColors.destructive.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					tagVariant={EnumTagVariant.outline}
				/>
				<Tag
					colorSchema={EnumColors.purple.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					tagVariant={EnumTagVariant.outline}
				/>
			</HScroll>
			<HScroll gap={EnumGap.s}>
				<Tag
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					tagVariant={EnumTagVariant.ghost}
				/>
				<Tag
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					colorSchema={EnumColors.success.default}
					tagVariant={EnumTagVariant.ghost}
				/>

				<Tag
					colorSchema={EnumColors.destructive.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					tagVariant={EnumTagVariant.ghost}
				/>
				<Tag
					colorSchema={EnumColors.purple.default}
					text={t("tag")}
					leftIcon={HouseIcon}
					rightIcon={HouseIcon}
					tagVariant={EnumTagVariant.ghost}
				/>
			</HScroll>
		</VStack>
	);
}
