export function shortenIfAddress(address?: unknown) {
	if (typeof address !== "string") {
		return "";
	}

	if (address.length > 10) {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	} else {
		return address;
	}
}

/**
 * Format a given price in USD. If the decimal part is too long, it will be shortened and displayed in subscript.
 * @param price The price to format
 * @param showSign Whether to show the currency sign
 */
export const prettyFormatUSDWithSubscript = (price: number | null | undefined, showSign = true) => {
	const [whole, decimal] = (price || 0)
		.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			minimumSignificantDigits: 2,
			maximumSignificantDigits: 4,
		})
		.split(".");
	const { numberOfZeros, shortenedPrice } = collapsePrice(decimal ?? "");

	if (numberOfZeros > 3) {
		return `${showSign ? "$" : ""}${whole ?? ""}.0${writeInSubscript(numberOfZeros)}${shortenedPrice}`;
	} else {
		return `${showSign ? "$" : ""}${whole ?? ""}.${decimal ?? "00"}`;
	}
};

/**
 * Format a token price with a lot of 0s. Compile it to a number of zeros and the remaining price
 *
 * Example: takes: 0000000003341 (decimal part of a price), returns: { numberOfZeros: 9, shortenedPrice: 3341 }
 */
export const collapsePrice = (input: number | string = 0): { numberOfZeros: number; shortenedPrice: number } => {
	// Convert the input number to a string to analyze the zeros
	const inputStr = input.toString();

	// Use a regular expression to find leading zeros
	const leadingZerosMatch = inputStr.match(/^0+/);

	// Calculate the number of leading zeros
	const numberOfZeros = leadingZerosMatch ? leadingZerosMatch[0].length : 0;

	const shortenedPrice = parseInt(inputStr.slice(numberOfZeros, numberOfZeros + 4) || "0", 10);

	return {
		numberOfZeros,
		shortenedPrice,
	};
};

const subscript: Record<string, string> = {
	"0": "₀",
	"1": "₁",
	"2": "₂",
	"3": "₃",
	"4": "₄",
	"5": "₅",
	"6": "₆",
	"7": "₇",
	"8": "₈",
	"9": "₉",
};

/**
 * Convert a number to a string with subscript numbers.
 * Useful for displaying decimals in a more readable format.
 */
export function writeInSubscript(input: number) {
	return input
		.toLocaleString("en-US", {
			notation: "standard",
			useGrouping: false,
		}) // Convert the number to a string without exponential notation or commas
		.split("")
		.map((char) => subscript[char] ?? char)
		.join("");
}

/** This function takes a string as input and its maximum allowed length, if the lenght is too big, it shortens the string */
export const safeString = (str: string | undefined, maxLength: number, hideDots?: boolean) => {
	if (!str) return "";
	return str.length > maxLength ? `${str.slice(0, maxLength)}${hideDots ? "" : "..."}` : str;
};
