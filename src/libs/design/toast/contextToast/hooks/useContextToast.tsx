import { useContext } from "react";
import { useTranslation } from "../../../../i18n";
import { ContextToast } from "..";

export function useContextToast() {
	const t = useTranslation("libs/toast");
	const _context = useContext(ContextToast);
	if (_context === null) {
		throw new Error(t("errorContextOutsideProvider"));
	}
	return _context;
}
