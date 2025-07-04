#!/usr/bin/env node
import { program } from "commander";
import { render } from "ink";
import { App } from "./src/App.js";
import { parseTimeInput, validateTimerParams } from "./src/utils.js";

program
	.name("hiit")
	.description("High Intensity Interval Training CLI Timer")
	.version("1.0.0")
	.option(
		"-m, --move <time>",
		"Movement time (30 or 30s for seconds, 2m for minutes)",
	)
	.option(
		"-r, --rest <time>",
		"Rest time (30 or 30s for seconds, 2m for minutes)",
	)
	.option("-s, --set <number>", "Number of sets")
	.parse();

const options = program.opts();

const args = [options.move, options.rest, options.set];
if (args.some((v) => v) && !args.every((v) => v)) {
	console.error("Error: All parameters must be provided together.");
	console.error("Usage: hiit -m <moveTime> -r <restTime> -s <sets>");
} else if (args.every((v) => v)) {
	const moveTime = parseTimeInput(options.move);
	const restTime = parseTimeInput(options.rest);
	const sets = parseInt(options.set);

	const validationError = validateTimerParams(moveTime, restTime, sets);
	if (validationError) {
		console.error(`Error: ${validationError}`);
		process.exit(1);
	}

	render(<App moveTime={moveTime} restTime={restTime} sets={sets} />);
} else {
	render(<App />);
}
