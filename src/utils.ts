export function approach(start: number, end: number, shift: number) : number {
	if (start < end) {
		return Math.min(start + shift, end);
	} else {
		return Math.max(start - shift, end);
	}
}
