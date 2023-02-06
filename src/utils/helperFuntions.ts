export function capitalizeWords(str: string) {
	return str.replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
}

export const sorting = (arr: any) => {
	const sorted = arr?.sort((a: any, b: any) => {
		const displayNameA = a?.displayName?.toLowerCase();
		const displayNameB = b?.displayName?.toLowerCase();

		if (displayNameA < displayNameB) {
			return -1;
		}
		if (displayNameA > displayNameB) {
			return 1;
		}
		return 0;
	});

	return sorted;
};
