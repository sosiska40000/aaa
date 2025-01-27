import React from 'react';
import { useSolutionStore } from '../store';
import { SolutionStep } from '../types/types';
import StepComponent from './StepComponent';
import { v4 as uuidv4 } from "uuid"


const getNestedSteps = (steps: SolutionStep[], path: number[]): SolutionStep[] => {
	let currentSteps: SolutionStep[] = steps;
	for (let i = 0; i < path.length; i += 2){
		const stepIndex = path[i];
		const substepIndex = path[i+1];
		if (currentSteps[stepIndex]?.substeps[substepIndex]?.subresult){
			currentSteps = currentSteps[stepIndex].substeps[substepIndex].subresult
		} else {
			return currentSteps;
		}
	}
	return currentSteps;
}

const SolutionStepsView: React.FC = () => {
	const { currentView, selectedSolutionId: currentSolutionId, solutions, actions } = useSolutionStore();

	if (currentView.type !== "STEPS") throw new Error ("no steps");
	const solution = solutions.byId[currentSolutionId];
	if (!solution.steps) throw new Error ("no steps");

	const expandedList = currentView.expandedList;

	const currentSteps = getNestedSteps(solution.steps, currentView.path);

	const handleSubresult = (stepIndex: number, substepIndex: number) => {
		actions.pushToViewStack({
			type: "STEPS",
			path: [...currentView.path, stepIndex, substepIndex],
			expandedList: []
		})
	}

	return (
		<div className="steps-container">
			<button onClick={() => actions.goBack()} >Back</button>
			{currentSteps.map((step, stepIndex) => (
				<StepComponent
					key={uuidv4()}
					step={step}
					stepIndex={stepIndex}
					isExpanded={expandedList[stepIndex]}
					onShowSubresult={handleSubresult}
					onToggleExpansion={() => { expandedList[stepIndex] = !expandedList[stepIndex] }}
				/>
			))}
		</div>
	)
}
export default SolutionStepsView
