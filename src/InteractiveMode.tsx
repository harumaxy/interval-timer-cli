import React, { useState } from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";

export interface InteractiveModeProps {
	onStart: (params: { moveTime: number; restTime: number; sets: number }) => void;
}

export function InteractiveMode({ onStart }: InteractiveModeProps) {
	const [step, setStep] = useState(0);
	const [moveTime, setMoveTime] = useState("");
	const [restTime, setRestTime] = useState("");
	const [sets, setSets] = useState("");

	const steps = [
		{ label: "Movement time (seconds)", value: moveTime, setValue: setMoveTime },
		{ label: "Rest time (seconds)", value: restTime, setValue: setRestTime },
		{ label: "Number of sets", value: sets, setValue: setSets }
	];

	const currentStep = steps[step];

	const handleSubmit = (value: string) => {
		currentStep.setValue(value);
		
		if (step < steps.length - 1) {
			setStep(step + 1);
		} else {
			onStart({
				moveTime: parseInt(moveTime),
				restTime: parseInt(restTime),
				sets: parseInt(sets)
			});
		}
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Text>HIIT Timer Setup</Text>
			<Text></Text>
			<Box>
				<Text>{currentStep.label}: </Text>
				<TextInput
					value={currentStep.value}
					onChange={currentStep.setValue}
					onSubmit={handleSubmit}
				/>
			</Box>
		</Box>
	);
}