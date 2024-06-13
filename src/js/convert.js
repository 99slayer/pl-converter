const vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];
const consonants = [
	'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
];
const nonalphabeticChars = [
	'', ' ', '\t', '\n', '\'', '"', ':', '/', '\\', '_', '-', '+', '=', '|', '<', '>', '.', '!', '?', ';', '~', ',', '@', '#', '$', '%', '^', '&', '*', '[', ']', '(', ')', '{', '}'
];

function convert(text) {
	const trimmed = text.trim();

	if (!trimmed) return;

	const arr = trimmed.split(/([\s'":/\\\_\-+=|<>.!?;~,@#$%^&*\[\]\(\)\{\}])/);
	let result = '';

	for (const word of arr) {
		result += convertWord(word);
	}

	return result;
}

function convertWord(word) {
	if (nonalphabeticChars.includes(word)) return word;
	if (vowels.includes(word)) return word + 'yay';
	if (consonants.includes(word)) return word;

	const cap = capCheck(word);
	const w = word.toLowerCase();
	const cluster = w.slice(0, 3);
	let yIndex;
	let count = 0;
	let chars = '';

	for (let i = 0; i < cluster.length; i++) {
		const char = cluster[i];

		if ((char === 'y' || char === 'Y') && yIndex === undefined) yIndex = i;
		if (consonants.includes(char)) {
			count++
		} else break;
	}

	if (count) {
		switch (yIndex) {
			case 0:
				chars = w.slice(0, 1);
				break;

			case 1 || 2:
				chars = w.slice(0, yIndex);
				break;

			default:
				chars = w.slice(0, count);
				break;
		}
	}

	const first = w.slice(chars.length, chars.length + 1);
	return (
		(cap ? first.toUpperCase() : first) +
		w.slice(chars.length + 1) +
		chars +
		(chars ? 'ay' : 'yay')
	);
};

function capCheck(w) {
	const char = w.slice(0, 1);

	if (char === char.toUpperCase()) {
		return true;
	} else {
		return false;
	}
};

export { convert };
