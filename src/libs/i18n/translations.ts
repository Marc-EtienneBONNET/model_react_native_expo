import accordeonLibFr from "../../locales/fr/libs/accordeons.json";
import buttonLibFr from "../../locales/fr/libs/button.json";
import buttonMenuLibFr from "../../locales/fr/libs/buttonMenu.json";
import inputsLibFr from "../../locales/fr/libs/inputs.json";
import tagLibFr from "../../locales/fr/libs/tag.json";
import toastLibFr from "../../locales/fr/libs/toast.json";
import accordeonFr from "../../locales/fr/pages/accordeon.json";
import buttonFr from "../../locales/fr/pages/button.json";
import dialogFr from "../../locales/fr/pages/dialog.json";
import homeFr from "../../locales/fr/pages/home.json";
import inputsFr from "../../locales/fr/pages/inputs.json";
import loaderFr from "../../locales/fr/pages/loader.json";
import secretteFr from "../../locales/fr/pages/secrette.json";
import tagFr from "../../locales/fr/pages/tag.json";
import toastFr from "../../locales/fr/pages/toast.json";

export const translations = {
	fr: {
		"pages/home": homeFr,
		"pages/accordeon": accordeonFr,
		"pages/button": buttonFr,
		"pages/dialog": dialogFr,
		"pages/inputs": inputsFr,
		"pages/loader": loaderFr,
		"pages/secrette": secretteFr,
		"pages/tag": tagFr,
		"pages/toast": toastFr,
		"libs/accordeons": accordeonLibFr,
		"libs/button": buttonLibFr,
		"libs/buttonMenu": buttonMenuLibFr,
		"libs/inputs": inputsLibFr,
		"libs/tag": tagLibFr,
		"libs/toast": toastLibFr,
	},
} as const;

export type TypeLocale = keyof typeof translations;
export type TypeNamespace = keyof (typeof translations)["fr"];
