import { exec } from "child_process";
import figlet from "figlet";
import { Box, Text, useApp, useInput } from "ink";
import { useEffect, useRef, useState } from "react";

export interface TimerProps {
	moveTime: number;
	restTime: number;
	sets: number;
}

type TimerState = "move" | "rest" | "finished";

const playSound = (soundPath: string) => {
	exec(`afplay "${soundPath}"`, (error) => {
		if (error) {
			console.error("Error playing sound:", error);
		}
	});
};

export function Timer({ moveTime, restTime, sets }: TimerProps) {
	const [currentSet, setCurrentSet] = useState(1);
	const [currentState, setCurrentState] = useState<TimerState>("move");
	const [timeLeft, setTimeLeft] = useState(moveTime);
	const [isActive, setIsActive] = useState(true);
	const { exit } = useApp();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useInput((input, key) => {
		if (key.escape || input === "q") {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			exit();
		}
		if (input === " ") {
			setIsActive(!isActive);
		}
	});

	useEffect(() => {
		if (!isActive) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		intervalRef.current = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					playSound("/System/Library/Sounds/Glass.aiff");

					if (currentState === "move") {
						setCurrentState("rest");
						return restTime;
					} else if (currentState === "rest") {
						if (currentSet >= sets) {
							setCurrentState("finished");
							return 0;
						} else {
							setCurrentSet((prev) => prev + 1);
							setCurrentState("move");
							return moveTime;
						}
					}
					return 0;
				} else {
					if (prev <= 4 && prev > 1) {
						playSound("/System/Library/Sounds/Ping.aiff");
					}
					return prev - 1;
				}
			});
		}, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isActive, currentState, currentSet, sets, moveTime, restTime]);

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const getStateText = (): string => {
		switch (currentState) {
			case "move":
				return "MOVE";
			case "rest":
				return "REST";
			case "finished":
				return "FINISHED";
			default:
				return "";
		}
	};

	const getStateColor = (): string => {
		switch (currentState) {
			case "move":
				return "green";
			case "rest":
				return "blue";
			case "finished":
				return "yellow";
			default:
				return "white";
		}
	};

	if (currentState === "finished") {
		return (
			<Box flexDirection="column" alignItems="center" padding={1}>
				<Text color="yellow">🎉 WORKOUT COMPLETE! 🎉</Text>
				<Text>Press ESC or 'q' to exit</Text>
			</Box>
		);
	}

	const timeDisplay = figlet.textSync(formatTime(timeLeft), {
		font: "Standard",
		horizontalLayout: "full",
		verticalLayout: "full",
	});

	return (
		<Box flexDirection="column" alignItems="center" padding={1}>
			<Text color={getStateColor()} bold>
				{getStateText()} - Set {currentSet}/{sets}
			</Text>
			<Text></Text>
			<Text color={getStateColor()}>{timeDisplay}</Text>
			<Text></Text>
			<Text color="gray">
				{isActive ? "Press SPACE to pause" : "Press SPACE to resume"} • Press
				ESC or 'q' to quit
			</Text>
		</Box>
	);
}
