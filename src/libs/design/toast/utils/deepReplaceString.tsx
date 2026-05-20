export function deepReplaceString<T>(
	input: T,
	search: string,
	replacement: string,
): T {
	if (typeof input === "string") {
		return input.replaceAll(search, replacement) as T;
	}
	if (Array.isArray(input)) {
		return input.map((item) =>
			deepReplaceString(item, search, replacement),
		) as T;
	}
	if (input !== null && typeof input === "object") {
		const result: Record<string, unknown> = {};
		for (const key in input) {
			result[key] = deepReplaceString(
				(input as Record<string, unknown>)[key],
				search,
				replacement,
			);
		}
		return result as T;
	}
	return input;
}
