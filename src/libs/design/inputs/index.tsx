import { ContextInputsProvider } from "./contextInput";
import { InputCode } from "./inputsCode";
import { InputDate } from "./inputsDate";
import { InputEmail } from "./inputsEmail";
import { InputHeure } from "./inputsHeure";
import { InputNumber } from "./inputsNumber";
import { InputPhone } from "./inputsPhone";
import { InputText } from "./inputsText";
import { InputTextarea } from "./inputsTextarea";

export const Inputs = {
	provider: ContextInputsProvider,
	text: InputText,
	textarea: InputTextarea,
	number: InputNumber,
	code: InputCode,
	date: InputDate,
	heure: InputHeure,
	email: InputEmail,
	phone: InputPhone,
};
