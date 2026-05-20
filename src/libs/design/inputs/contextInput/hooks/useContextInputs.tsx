import { useContext } from "react";
import { useTranslation } from "../../../../i18n";
import { ContextInputs, type TypeInputsShape, type TypePropsInputs } from "..";

export function useContextInputs<T extends TypeInputsShape>() {
	const t = useTranslation("libs/inputs");
	const _context = useContext(ContextInputs);
	if (_context === null) {
		throw new Error(t("errorContextOutsideProvider"));
	}
	return _context as unknown as TypePropsInputs<T>;
}
