import { useState } from "react";
import { Text } from "../../libs/basics/text";
import { VStack } from "../../libs/basics/vStack";
import { Btn } from "../../libs/design/buttons";
import { Dialog } from "../../libs/design/dialog";
import { useContextToast } from "../../libs/design/toast/contextToast/hooks/useContextToast";
import { useTranslation } from "../../libs/i18n";
import { EnumColors } from "../../themes/colors/enum/enumColors";
import { EnumGap } from "../../themes/spacing";

export function PageDialog() {
	const t = useTranslation("pages/dialog");
	const [_basicDialog, setBasicDialog] = useState<boolean>(false);
	const [_canCloseDialog, _setCanCloseDialog] = useState<boolean>(false);
	const { newToast } = useContextToast();

	return (
		<VStack
			flex={1}
			height={"100%"}
			width={"100%"}
			gap={EnumGap.l}
			padding={EnumGap.m}
		>
			<Btn.basic
				onPress={() => {
					setBasicDialog((prev) => !prev);
				}}
				text={t("basicDialogButton", { state: String(_basicDialog) })}
			/>
			<Btn.basic
				onPress={() => {
					_setCanCloseDialog((prev) => !prev);
				}}
				text={t("cantCloseDialogButton", { state: String(_basicDialog) })}
			/>
			<Dialog
				isOpen={_basicDialog}
				onClose={() => {
					setBasicDialog(false);
				}}
			>
				<Text>{t("basicDialogContent")}</Text>
				<Btn.basic
					onPress={() => {
						newToast({
							title: t("errorToast.title"),
							subtitle: t("errorToast.subtitle"),

							colorSchema: EnumColors.destructive.default,
						});
					}}
					text={t("testToast")}
					colorSchema={EnumColors.destructive.default}
				/>
				<Btn.menu text={t("options")}>
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
				</Btn.menu>
			</Dialog>
			<Dialog
				isOpen={_canCloseDialog}
				canClose={false}
				onClose={() => {
					setBasicDialog(false);
				}}
			>
				<Text>{t("cantCloseDialogContent")}</Text>
			</Dialog>
		</VStack>
	);
}
