import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import { HStack } from "../../../basics/hStack";
import { Text } from "../../../basics/text";
import { VStack } from "../../../basics/vStack";
import { useContextInputs } from "../contextInput/hooks/useContextInputs";
import {
	EnumInputSize,
	inputSizeStyles,
} from "../inputsText/size/enumInputSize";
import { KEYBOARD_ACCESSORY_ID } from "../keyboardAccessory";

type TypeInputTextareaProps = Omit<
	TextInputProps,
	"value" | "onChangeText" | "multiline"
> & {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: string) => string | undefined;
	size?: EnumInputSize;
	rows?: number;
	isSecret?: boolean;
};

export function InputTextarea({
	label,
	title,
	helper,
	setError,
	size = EnumInputSize.m,
	rows = 4,
	isSecret = false,
	...props
}: TypeInputTextareaProps) {
	const { values, setValues, errors, setErrors } = useContextInputs();
	const [_isTouched, _setIsTouched] = useState(false);
	const _theme = useTheme<TypeTheme>();
	const _textColor = _theme.colors.text;
	const _grayColor = _theme.colors["gray.f"];
	const _sizeStyle = inputSizeStyles[size];

	const _rawValue = values[label];
	const _value = _rawValue === undefined ? "" : String(_rawValue);
	const _errorMessage = _isTouched ? errors[label] : undefined;
	const _minHeight = _sizeStyle.fontSize * 1.4 * rows;

	useEffect(() => {
		if (setError !== undefined) {
			setErrors[label](setError(_value));
		}
	}, [_value, setError, label, setErrors]);

	function handleChangeText(text: string) {
		if (!_isTouched) _setIsTouched(true);
		setValues[label](text);
	}

	return (
		<VStack gap={EnumGap.xs} flex={1}>
			{title !== undefined && (
				<Text variant={_sizeStyle.titleVariant} color={EnumColors.text}>
					{title}
				</Text>
			)}
			<HStack
				alignItems={"flex-start"}
				gap={EnumGap.s}
				borderWidth={1}
				borderStyle={"solid"}
				borderColor={EnumColors.gray.f}
				borderRadius={EnumRadius.s}
				paddingHorizontal={_sizeStyle.paddingHorizontal}
				paddingVertical={_sizeStyle.paddingVertical}
			>
				<TextInput
					value={_value}
					onChangeText={handleChangeText}
					placeholderTextColor={_grayColor}
					multiline={true}
					textAlignVertical={"top"}
					inputAccessoryViewID={KEYBOARD_ACCESSORY_ID}
					secureTextEntry={isSecret}
					style={{
						flex: 1,
						color: _textColor,
						fontSize: _sizeStyle.fontSize,
						minHeight: _minHeight,
					}}
					{...props}
				/>
			</HStack>
			{_errorMessage !== undefined ? (
				<Text
					variant={_sizeStyle.helperVariant}
					color={EnumColors.red.a}
					fontStyle={"italic"}
				>
					{_errorMessage}
				</Text>
			) : helper !== undefined ? (
				<Text
					variant={_sizeStyle.helperVariant}
					color={EnumColors.gray.a}
					fontStyle={"italic"}
				>
					{helper}
				</Text>
			) : null}
		</VStack>
	);
}
