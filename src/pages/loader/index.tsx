import { Text } from "../../libs/basics/text";
import { EnumTextVariant } from "../../libs/basics/text/props/variant/textVariant";
import { VScroll } from "../../libs/basics/vScroll";
import { VStack } from "../../libs/basics/vStack";
import { Loader } from "../../libs/design/loader";
import { useTranslation } from "../../libs/i18n";

export function PageLoader() {
	const t = useTranslation("pages/loader");

	return (
		<VStack flex={1} height={"100%"} width={"100%"}>
			<VScroll>
				<Text variant={EnumTextVariant.xl.semibold}>{t("spinner")}</Text>
				<VStack width={200} height={200} border="red" position="relative">
					<Text>{t("filler")}</Text>
					<Loader.Spinner text={t("loading")} />
				</VStack>
				<VStack width={200} height={20} border="red" position="relative">
					<Loader.Spinner text={t("loading")} />
				</VStack>
				<VStack width={600} height={600} border="red" position="relative">
					<Loader.Spinner text={t("loading")} />
				</VStack>
				<Text variant={EnumTextVariant.xl.semibold}>{t("skeleton")}</Text>
				<VStack width={200} height={200} border="red" position="relative">
					<Text>{t("filler")}</Text>
					<Text>{t("filler")}</Text>
					<Text>{t("filler")}</Text>
					<Text>{t("filler")}</Text>

					<Loader.Skeleton />
				</VStack>
				<VStack width={200} height={20} border="red" position="relative">
					<Loader.Skeleton />
				</VStack>
				<VStack width={600} height={600} border="red" position="relative">
					<Loader.Skeleton />
				</VStack>
			</VScroll>
		</VStack>
	);
}
