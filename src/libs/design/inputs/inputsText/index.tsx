import { useTheme } from "@shopify/restyle";
import { type ReactNode, useEffect, useState } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import { Box } from "../../../basics/box";
import { HStack } from "../../../basics/hStack";
import { Text } from "../../../basics/text";
import { VStack } from "../../../basics/vStack";
import { useContextInputs } from "../contextInput/hooks/useContextInputs";
import { KEYBOARD_ACCESSORY_ID } from "../keyboardAccessory";
import { EnumInputSize, inputSizeStyles } from "./size/enumInputSize";

type TypeInputTextProps = Omit<TextInputProps, "value" | "onChangeText"> & {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: string) => string | undefined;
	size?: EnumInputSize;
	leftComponent?: ReactNode;
	rightComponent?: ReactNode;
	formatValue?: (rawValue: string) => string;
	parseValue?: (displayValue: string) => string;
	isSecret?: boolean;
};

export function InputText({
	label,
	title,
	helper,
	setError,
	size = EnumInputSize.m,
	leftComponent,
	rightComponent,
	formatValue,
	parseValue,
	isSecret = false,
	...props
}: TypeInputTextProps) {
	const { values, setValues, errors, setErrors } = useContextInputs();
	const [_isTouched, _setIsTouched] = useState(false);
	const _theme = useTheme<TypeTheme>();
	const _textColor = _theme.colors.text;
	const _grayColor = _theme.colors["gray.f"];
	const _sizeStyle = inputSizeStyles[size];

	const _rawValue = values[label];
	const _rawString = _rawValue === undefined ? "" : String(_rawValue);
	const _displayValue =
		formatValue !== undefined ? formatValue(_rawString) : _rawString;
	const _errorMessage = _isTouched ? errors[label] : undefined;

	useEffect(() => {
		if (setError !== undefined) {
			setErrors[label](setError(_rawString));
		}
	}, [_rawString, setError, label, setErrors]);

	function handleChangeText(text: string) {
		if (!_isTouched) _setIsTouched(true);
		const _toStore = parseValue !== undefined ? parseValue(text) : text;
		setValues[label](_toStore);
	}

	return (
		<VStack gap={EnumGap.xs} flex={1}>
			{title !== undefined && (
				<Text variant={_sizeStyle.titleVariant} color={EnumColors.text}>
					{title}
				</Text>
			)}
			<HStack
				alignItems={"center"}
				gap={EnumGap.s}
				borderWidth={1}
				borderStyle={"solid"}
				borderColor={EnumColors.gray.f}
				borderRadius={EnumRadius.s}
				paddingHorizontal={_sizeStyle.paddingHorizontal}
				paddingVertical={_sizeStyle.paddingVertical}
			>
				{leftComponent}
				<TextInput
					value={_displayValue}
					onChangeText={handleChangeText}
					placeholderTextColor={_grayColor}
					inputAccessoryViewID={KEYBOARD_ACCESSORY_ID}
					secureTextEntry={isSecret}
					style={{
						flex: 1,
						color: _textColor,
						fontSize: _sizeStyle.fontSize,
					}}
					{...props}
				/>
				{rightComponent !== undefined && (
					<>
						<Box
							alignSelf={"stretch"}
							width={1}
							backgroundColor={EnumColors.gray.f}
						/>
						{rightComponent}
					</>
				)}
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
