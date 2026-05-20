import { Text } from "../../libs/basics/text";
import { VStack } from "../../libs/basics/vStack";
import { useTranslation } from "../../libs/i18n";

export function PageSecrette() {
	const t = useTranslation("pages/secrette");

	return (
		<VStack flex={1} height={"100%"} width={"100%"}>
			<Text>{t("title")}</Text>
		</VStack>
	);
}
