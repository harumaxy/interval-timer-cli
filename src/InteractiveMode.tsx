import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";
import { parseTimeInput, isValidTimeInput, isValidNumberInput } from "./utils.js";

export interface InteractiveModeProps {
	onStart: (params: {
		moveTime: number;
		restTime: number;
		sets: number;
	}) => void;
}

export function InteractiveMode({ onStart }: InteractiveModeProps) {
	const [step, setStep] = useState(0);
	const [moveTime, setMoveTime] = useState("");
	const [restTime, setRestTime] = useState("");
	const [sets, setSets] = useState("");
	const [error, setError] = useState("");

	const steps = [
		{
			label: "Movement time (e.g., 30, 30s, 2m)",
			value: moveTime,
			setValue: setMoveTime,
			validate: isValidTimeInput,
		},
		{ 
			label: "Rest time (e.g., 10, 10s, 1m)", 
			value: restTime, 
			setValue: setRestTime,
			validate: isValidTimeInput,
		},
		{ 
			label: "Number of sets", 
			value: sets, 
			setValue: setSets,
			validate: isValidNumberInput,
		},
	];

	const currentStep = steps[step];

	if (!currentStep) {
		return <Text>Error: Invalid step</Text>;
	}

	const handleSubmit = (value: string) => {
		if (!currentStep.validate(value)) {
			setError(`Invalid input: ${currentStep.label.toLowerCase()} must be a positive number`);
			return;
		}
		
		setError("");
		currentStep.setValue(value);

		if (step < steps.length - 1) {
			setStep(step + 1);
		} else {
			onStart({
				moveTime: parseTimeInput(moveTime),
				restTime: parseTimeInput(restTime),
				sets: parseInt(sets),
			});
		}
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Text>HIIT Timer Setup</Text>
			<Text></Text>
			
			{/* Display all previous steps with their answers */}
			{steps.map((s, index) => {
				if (index < step) {
					return (
						<Box key={`step-${index}-${s.label}`} marginBottom={1}>
							<Text color="gray">{s.label}: </Text>
							<Text color="green">{s.value}</Text>
						</Box>
					);
				}
				return null;
			})}
			
			{/* Current step input */}
			<Box>
				<Text>{currentStep.label}: </Text>
				<TextInput
					value={currentStep.value}
					onChange={currentStep.setValue}
					onSubmit={handleSubmit}
				/>
			</Box>
			
			{/* Error message */}
			{error && (
				<Box marginTop={1}>
					<Text color="red">{error}</Text>
				</Box>
			)}
		</Box>
	);
}
