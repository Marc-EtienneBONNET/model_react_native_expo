import { InputAccessoryView, Keyboard, Platform } from "react-native";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import { EnumGap } from "../../../../themes/spacing";
import { HStack } from "../../../basics/hStack";
import { Text } from "../../../basics/text";
import { TouchableOpacity } from "../../../basics/touchableOpacity";
import { useTranslation } from "../../../i18n";

export const KEYBOARD_ACCESSORY_ID = "inputAccessoryDone";

export function KeyboardAccessory() {
	const t = useTranslation("libs/inputs");
	if (Platform.OS !== "ios") return null;

	return (
		<InputAccessoryView nativeID={KEYBOARD_ACCESSORY_ID}>
			<HStack
				alignItems={"center"}
				justifyContent={"flex-end"}
				paddingHorizontal={EnumGap.m}
				paddingVertical={EnumGap.s}
				backgroundColor={EnumColors.background}
				borderTopWidth={1}
				borderTopColor={EnumColors.gray.f}
			>
				<TouchableOpacity onPress={() => Keyboard.dismiss()}>
					<Text variant={"mSemibold"} color={EnumColors.text}>
						{t("keyboardAccessory.done")}
					</Text>
				</TouchableOpacity>
			</HStack>
		</InputAccessoryView>
	);
}
