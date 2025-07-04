import { Text } from "ink";
import { useState } from "react";
import { InteractiveMode } from "./InteractiveMode.js";
import { Timer } from "./Timer.js";
import { validateTimerParams } from "./utils.js";

export interface AppProps {
	moveTime?: number;
	restTime?: number;
	sets?: number;
}

export function App({ moveTime, restTime, sets }: AppProps) {
	const [isInteractive, setIsInteractive] = useState(
		!moveTime || !restTime || !sets,
	);
	const [timerParams, setTimerParams] = useState<{
		moveTime: number;
		restTime: number;
		sets: number;
	} | null>(null);

	if (isInteractive) {
		return (
			<InteractiveMode
				onStart={(params) => {
					setTimerParams(params);
					setIsInteractive(false);
				}}
			/>
		);
	}

	if (timerParams) {
		const validationError = validateTimerParams(timerParams.moveTime, timerParams.restTime, timerParams.sets);
		if (validationError) {
			return <Text color="red">Error: {validationError}</Text>;
		}
		return <Timer {...timerParams} />;
	}

	if (moveTime && restTime && sets) {
		const validationError = validateTimerParams(moveTime, restTime, sets);
		if (validationError) {
			return <Text color="red">Error: {validationError}</Text>;
		}
		return <Timer moveTime={moveTime} restTime={restTime} sets={sets} />;
	}

	return <Text>Error: Missing parameters</Text>;
}
