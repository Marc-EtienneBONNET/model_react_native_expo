function required(name: keyof NodeJS.ProcessEnv): string {
	const _value = process.env[name];
	if (_value === undefined || _value === "") {
		throw new Error(`Variable d'environnement manquante : ${name}`);
	}
	return _value;
}

export const env = {
	apiUrl: required("EXPO_PUBLIC_API_URL"),
} as const;
