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
import {
	EnumInputSize,
	inputSizeStyles,
} from "../inputsText/size/enumInputSize";
import { KEYBOARD_ACCESSORY_ID } from "../keyboardAccessory";

type TypeInputNumberProps = Omit<
	TextInputProps,
	"value" | "onChangeText" | "keyboardType"
> & {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: number | undefined) => string | undefined;
	size?: EnumInputSize;
	rightComponent?: ReactNode;
	decimal?: boolean;
	allowNegative?: boolean;
	isSecret?: boolean;
};

export function InputNumber({
	label,
	title,
	helper,
	setError,
	size = EnumInputSize.m,
	rightComponent,
	decimal = false,
	allowNegative = true,
	isSecret = false,
	...props
}: TypeInputNumberProps) {
	const { values, setValues, errors, setErrors } = useContextInputs();
	const [_isTouched, _setIsTouched] = useState(false);
	const _theme = useTheme<TypeTheme>();
	const _textColor = _theme.colors.text;
	const _grayColor = _theme.colors["gray.f"];
	const _sizeStyle = inputSizeStyles[size];

	const _rawValue = values[label];
	const _contextNumber = typeof _rawValue === "number" ? _rawValue : undefined;
	const [_displayValue, _setDisplayValue] = useState<string>(
		_contextNumber === undefined ? "" : String(_contextNumber),
	);
	const _errorMessage = _isTouched ? errors[label] : undefined;

	useEffect(() => {
		if (setError !== undefined) {
			setErrors[label](setError(_contextNumber));
		}
	}, [_contextNumber, setError, label, setErrors]);

	function sanitize(text: string): string {
		let _allowed = "0123456789";
		if (decimal) _allowed += ".";
		let _filtered = "";
		let _seenDot = false;
		for (let _i = 0; _i < text.length; _i++) {
			const _char = text[_i];
			if (allowNegative && _char === "-" && _i === 0 && _filtered === "") {
				_filtered += _char;
				continue;
			}
			if (decimal && _char === ".") {
				if (_seenDot) continue;
				_seenDot = true;
				_filtered += _char;
				continue;
			}
			if (_allowed.includes(_char) && _char !== ".") {
				_filtered += _char;
			}
		}
		return _filtered;
	}

	function handleChangeText(text: string) {
		if (!_isTouched) _setIsTouched(true);
		const _sanitized = sanitize(text);
		_setDisplayValue(_sanitized);

		if (
			_sanitized === "" ||
			_sanitized === "-" ||
			_sanitized === "." ||
			_sanitized === "-."
		) {
			setValues[label](undefined);
			return;
		}
		const _parsed = decimal
			? Number.parseFloat(_sanitized)
			: Number.parseInt(_sanitized, 10);
		if (!Number.isNaN(_parsed)) {
			setValues[label](_parsed);
		}
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
				<TextInput
					value={_displayValue}
					onChangeText={handleChangeText}
					placeholderTextColor={_grayColor}
					keyboardType={
						allowNegative
							? "numbers-and-punctuation"
							: decimal
								? "decimal-pad"
								: "number-pad"
					}
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
