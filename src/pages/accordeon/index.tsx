import { HouseIcon } from "phosphor-react-native";
import { Text } from "../../libs/basics/text";
import { VStack } from "../../libs/basics/vStack";
import { Accordeons, EnumAccordeonVariant } from "../../libs/design/accordeons";
import { useTranslation } from "../../libs/i18n";
import { EnumGap } from "../../themes/spacing";

export function PageAccordeon() {
	const t = useTranslation("pages/accordeon");

	return (
		<VStack
			flex={1}
			height={"100%"}
			width={"100%"}
			gap={EnumGap.l}
			padding={EnumGap.m}
		>
			<Accordeons.parent>
				<Accordeons.child text={t("child1Title")} leftIcon={HouseIcon}>
					<Text>{t("index1")}</Text>
					<Text>{t("welcome")}</Text>
					<Text>{t("index1")}</Text>
				</Accordeons.child>
				<Accordeons.child text={t("child2Title")} leftIcon={HouseIcon}>
					<Text>{t("index2")}</Text>
					<Text>{t("welcome")}</Text>
					<Text>{t("index2")}</Text>
				</Accordeons.child>
			</Accordeons.parent>

			<Accordeons.parent
				variant={EnumAccordeonVariant.multiOpen}
				indexOpen={[1, 2]}
			>
				<Accordeons.child text={t("child1Title")} leftIcon={HouseIcon}>
					<Text>{t("index1")}</Text>
					<Text>{t("welcome")}</Text>
					<Text>{t("index1")}</Text>
				</Accordeons.child>
				<Accordeons.child text={t("child2Title")} leftIcon={HouseIcon}>
					<Text>{t("index2")}</Text>
					<Text>{t("welcome")}</Text>
					<Text>{t("index2")}</Text>
				</Accordeons.child>
				<Accordeons.child text={t("child2Title")} leftIcon={HouseIcon}>
					<Text>{t("index2")}</Text>
					<Text>{t("welcome")}</Text>
					<Text>{t("index2")}</Text>
				</Accordeons.child>
				<Accordeons.child text={t("child2Title")} leftIcon={HouseIcon}>
					<Text>{t("index2")}</Text>
					<Text>{t("welcome")}</Text>
					<Text>{t("index2")}</Text>
				</Accordeons.child>
			</Accordeons.parent>
		</VStack>
	);
}
