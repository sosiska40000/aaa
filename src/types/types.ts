export type Solution = {
	preview: SolutionPreview,
	steps?: SolutionStep[];
}
export type SolutionPreview = {
	title: string;
	problem: string;
	method: string;
	description: string;
	solution: string;
	command: any;
}

export type SolutionStep = {
	header: string;
	substeps: Substep[]
}

export type Substep = {
	left: string;
	right: string;
	description: string;
	subresult?: SolutionStep[]
}

export type AppView = 
	| { type: "DEFAULT" }
	| { type: "PREVIEW" }
	| { type: "STEPS", path: number[], expandedList: boolean[] }
