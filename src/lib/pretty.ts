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
