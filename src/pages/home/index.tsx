import { Text } from "../../libs/basics/text";
import { VStack } from "../../libs/basics/vStack";
import { useTranslation } from "../../libs/i18n";
import { EnumGap } from "../../themes/spacing";

export function PageHome() {
	const t = useTranslation("pages/home");

	return (
		<VStack
			flex={1}
			height={"100%"}
			width={"100%"}
			gap={EnumGap.l}
			padding={EnumGap.s}
		>
			<Text>{t("title")}</Text>
		</VStack>
	);
}
