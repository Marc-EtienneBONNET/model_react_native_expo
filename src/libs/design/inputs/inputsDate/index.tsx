import { useTheme } from "@shopify/restyle";
import { CalendarIcon } from "phosphor-react-native";
import { type ReactNode, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import { Box } from "../../../basics/box";
import { HStack } from "../../../basics/hStack";
import { Icon } from "../../../basics/icon";
import { Text } from "../../../basics/text";
import { TouchableOpacity } from "../../../basics/touchableOpacity";
import { VStack } from "../../../basics/vStack";
import { useTranslation } from "../../../i18n";
import { useContextInputs } from "../contextInput/hooks/useContextInputs";
import {
	EnumInputSize,
	inputSizeStyles,
} from "../inputsText/size/enumInputSize";
import { EnumInputDateVariant } from "./variant/enumInputDateVariant";

type TypeInputDateProps = {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: Date | undefined) => string | undefined;
	size?: EnumInputSize;
	placeholder?: string;
	variant?: EnumInputDateVariant;
	minimumDate?: Date;
	maximumDate?: Date;
	autoFocus?: boolean;
	rightComponent?: ReactNode;
	isSecret?: boolean;
};

function formatDate(value: Date, variant: EnumInputDateVariant): string {
	if (variant === EnumInputDateVariant.dateEtHeure) {
		return value.toLocaleString([], {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	}
	return value.toLocaleDateString();
}

export function InputDate({
	label,
	title,
	helper,
	setError,
	size = EnumInputSize.m,
	placeholder,
	variant = EnumInputDateVariant.date,
	minimumDate,
	maximumDate,
	autoFocus = false,
	rightComponent = <Icon as={CalendarIcon} />,
	isSecret = false,
}: TypeInputDateProps) {
	const t = useTranslation("libs/inputs");
	const { values, setValues, errors, setErrors } = useContextInputs();
	const _defaultPlaceholder =
		variant === EnumInputDateVariant.dateEtHeure
			? t("date.placeholderDateTime")
			: t("date.placeholderDate");
	const [_isTouched, _setIsTouched] = useState(false);
	const [_isOpen, _setIsOpen] = useState<boolean>(autoFocus);
	const _theme = useTheme<TypeTheme>();
	const _sizeStyle = inputSizeStyles[size];

	const _rawValue = values[label];
	const _contextDate = _rawValue instanceof Date ? _rawValue : undefined;
	const _errorMessage = _isTouched ? errors[label] : undefined;
	const _formattedDate =
		_contextDate !== undefined ? formatDate(_contextDate, variant) : "";
	const _displayValue = isSecret
		? "•".repeat(_formattedDate.length)
		: _formattedDate;
	const _pickerMode =
		variant === EnumInputDateVariant.dateEtHeure ? "datetime" : "date";

	useEffect(() => {
		if (setError !== undefined) {
			setErrors[label](setError(_contextDate));
		}
	}, [_contextDate, setError, label, setErrors]);

	function handleConfirm(date: Date) {
		if (!_isTouched) _setIsTouched(true);
		setValues[label](date);
		_setIsOpen(false);
	}

	function handleCancel() {
		_setIsOpen(false);
	}

	return (
		<VStack gap={EnumGap.xs} flex={1}>
			{title !== undefined && (
				<Text variant={_sizeStyle.titleVariant} color={EnumColors.text}>
					{title}
				</Text>
			)}
			<TouchableOpacity activeOpacity={0.7} onPress={() => _setIsOpen(true)}>
				<HStack
					alignItems={"center"}
					gap={EnumGap.s}
					borderWidth={1}
					borderStyle={"solid"}
					borderColor={EnumColors.gray.f}
					borderRadius={EnumRadius.s}
					padding={_sizeStyle.paddingHorizontal}
					paddingVertical={_sizeStyle.paddingVertical}
					overflow={"hidden"}
				>
					<VStack flex={1}>
						<Text
							color={_displayValue === "" ? EnumColors.gray.f : EnumColors.text}
							style={{ fontSize: _sizeStyle.fontSize }}
						>
							{_displayValue !== ""
								? _displayValue
								: (placeholder ?? _defaultPlaceholder)}
						</Text>
					</VStack>
					{rightComponent !== undefined && (
						<>
							<Box
								alignSelf={"stretch"}
								width={1}
								backgroundColor={EnumColors.gray.f}
							/>
							<Box>{rightComponent}</Box>
						</>
					)}
				</HStack>
			</TouchableOpacity>
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

			<DateTimePickerModal
				isVisible={_isOpen}
				mode={_pickerMode}
				display={
					variant === EnumInputDateVariant.dateEtHeure ? "inline" : undefined
				}
				date={_contextDate ?? new Date()}
				minimumDate={minimumDate}
				maximumDate={maximumDate}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</VStack>
	);
}
