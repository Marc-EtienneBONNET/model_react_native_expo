import { EnumColors } from "../themes/colors/enum/enumColors";

enum EnumColorMode {
	default = "default",
	all = "all",
}

export function getRandomColor(
	mode: EnumColorMode = EnumColorMode.default,
): string {
	const values: string[] = [];

	for (const entry of Object.values(EnumColors)) {
		if (typeof entry === "string") {
			values.push(entry);
			continue;
		}

		if (mode === EnumColorMode.default) {
			values.push(entry.default);
			continue;
		}

		for (const [shade, value] of Object.entries(entry)) {
			if (shade === "default") continue;
			values.push(value as string);
		}
	}

	return values[Math.floor(Math.random() * values.length)];
}
