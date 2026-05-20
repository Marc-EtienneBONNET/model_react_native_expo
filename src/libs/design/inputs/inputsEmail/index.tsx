import { AtIcon } from "phosphor-react-native";
import type { TextInputProps } from "react-native";
import { Icon } from "../../../basics/icon";
import { useTranslation } from "../../../i18n";
import { InputText } from "../inputsText";
import type { EnumInputSize } from "../inputsText/size/enumInputSize";

type TypeInputEmailProps = Omit<
	TextInputProps,
	| "value"
	| "onChangeText"
	| "keyboardType"
	| "autoCapitalize"
	| "autoCorrect"
	| "secureTextEntry"
> & {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: string) => string | undefined;
	size?: EnumInputSize;
	isSecret?: boolean;
};

export function InputEmail({
	setError,
	placeholder,
	...props
}: TypeInputEmailProps) {
	const t = useTranslation("libs/inputs");

	function emailValidation(value: string): string | undefined {
		if (value.length === 0) return undefined;
		if (!value.includes("@") || !value.includes("."))
			return t("email.errorInvalid");
		return undefined;
	}

	return (
		<InputText
			{...props}
			placeholder={placeholder ?? t("email.placeholder")}
			keyboardType={"email-address"}
			autoCapitalize={"none"}
			autoCorrect={false}
			rightComponent={<Icon as={AtIcon} />}
			setError={(value) => emailValidation(value) ?? setError?.(value)}
		/>
	);
}
