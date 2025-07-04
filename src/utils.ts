export function parseTimeInput(input: string): number {
	const trimmed = input.trim();
	if (!trimmed) {
		return NaN;
	}

	let value: number;
	if (trimmed.endsWith('m')) {
		const minutes = parseInt(trimmed.slice(0, -1));
		value = minutes * 60;
	} else if (trimmed.endsWith('s')) {
		value = parseInt(trimmed.slice(0, -1));
	} else {
		value = parseInt(trimmed);
	}

	return value;
}

export function isValidTimeInput(input: string): boolean {
	const parsed = parseTimeInput(input);
	return !isNaN(parsed) && parsed > 0;
}

export function isValidNumberInput(input: string): boolean {
	const trimmed = input.trim();
	if (!trimmed) {
		return false;
	}
	const parsed = parseInt(trimmed);
	return !isNaN(parsed) && parsed > 0;
}

export function validateTimerParams(moveTime: number, restTime: number, sets: number): string | null {
	if (isNaN(moveTime) || moveTime <= 0) {
		return "Movement time must be a positive number";
	}
	if (isNaN(restTime) || restTime <= 0) {
		return "Rest time must be a positive number";
	}
	if (isNaN(sets) || sets <= 0) {
		return "Number of sets must be a positive number";
	}
	return null;
}