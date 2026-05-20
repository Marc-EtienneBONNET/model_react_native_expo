import { useState } from "react";
import { VStack } from "../../libs/basics/vStack";
import { Button } from "../../libs/design/buttons/button";
import { useContextToast } from "../../libs/design/toast/contextToast/hooks/useContextToast";
import { useTranslation } from "../../libs/i18n";
import { EnumColors } from "../../themes/colors/enum/enumColors";
import { EnumGap } from "../../themes/spacing";

export function PageToast() {
	const t = useTranslation("pages/toast");
	const [_basiToast, _setBasicToast] = useState<boolean>(false);
	const [_colorToast, _setColorToast] = useState<boolean>(false);
	const { newToast } = useContextToast();

	return (
		<VStack
			flex={1}
			height={"100%"}
			width={"100%"}
			gap={EnumGap.l}
			padding={EnumGap.m}
		>
			<Button
				onPress={() => {
					newToast({
						title: t("basic.title"),
						subtitle: t("basic.subtitle"),
					});
				}}
				text={t("buttonLabel", { state: String(_basiToast) })}
			/>
			<Button
				onPress={() => {
					newToast({
						title: t("success.title"),
						subtitle: t("success.subtitle"),
						colorSchema: EnumColors.success.default,
					});
				}}
				colorSchema={EnumColors.success.default}
				text={t("buttonLabel", { state: String(_colorToast) })}
			/>
			<Button
				onPress={() => {
					newToast({
						title: t("error.title"),
						subtitle: t("error.subtitle"),

						colorSchema: EnumColors.destructive.default,
					});
				}}
				text={t("buttonLabel", { state: String(_colorToast) })}
				colorSchema={EnumColors.destructive.default}
			/>
		</VStack>
	);
}
