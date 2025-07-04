import { Text } from "ink";
import { useState } from "react";
import { InteractiveMode } from "./InteractiveMode.js";
import { Timer } from "./Timer.js";

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
		return <Timer {...timerParams} />;
	}

	if (moveTime && restTime && sets) {
		return <Timer moveTime={moveTime} restTime={restTime} sets={sets} />;
	}

	return <Text>Error: Missing parameters</Text>;
}
