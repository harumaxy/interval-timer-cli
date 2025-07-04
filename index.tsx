#!/usr/bin/env node
import { render } from "ink";
import { program } from "commander";
import { App } from "./src/App.js";

program
	.name("hiit")
	.description("High Intensity Interval Training CLI Timer")
	.version("1.0.0")
	.option("-m, --move <time>", "Movement time (30 or 30s for seconds, 2m for minutes)")
	.option("-r, --rest <time>", "Rest time (30 or 30s for seconds, 2m for minutes)")
	.option("-s, --set <number>", "Number of sets", parseInt)
	.parse();

const options = program.opts();

if (options.move && options.rest && options.set) {
	const moveTime = parseTime(options.move);
	const restTime = parseTime(options.rest);
	const sets = options.set;
	
	render(<App moveTime={moveTime} restTime={restTime} sets={sets} />);
} else {
	render(<App />);
}

function parseTime(timeStr: string): number {
	if (timeStr.endsWith("m")) {
		return parseInt(timeStr.slice(0, -1)) * 60;
	} else if (timeStr.endsWith("s")) {
		return parseInt(timeStr.slice(0, -1));
	} else {
		return parseInt(timeStr);
	}
}
