import { SolutionPreview, SolutionStep } from "../types/types";

const API_BASE = "/api";
const PROCESS_IMAGE_ROUTE = API_BASE + "/process-image";
const PROCESS_COMMAND_ROUTE = API_BASE + "/process-command";

export async function processImage(imageBlob: Blob): Promise<SolutionPreview[]> {
	const formData = new FormData();
	formData.append('image', imageBlob);

	const response = await fetch(PROCESS_IMAGE_ROUTE, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) throw new Error('Image processing failed');
	return response.json();
}

export async function processCommand(command: any): Promise<SolutionStep[]> {
	const response = await fetch(PROCESS_COMMAND_ROUTE, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ command }),
	});

	if (!response.ok) throw new Error('Command processing failed');
	return response.json();
}
