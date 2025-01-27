import React from 'react';
import LatexRenderer from './LatexRenderer';
import { useSolutionStore } from '../store';
import { processCommand } from '../utils/api';

const SolutionPreviewView: React.FC = () => {

	const { solutions, selectedSolutionId: currentSolutionId, actions } = useSolutionStore();
	const currentSolution = solutions.byId[currentSolutionId];
	const { title, problem, method, solution, command } = currentSolution.preview;

	const handleStepByStep = async (command: any) => {
		try {
			actions.setError(null);
			actions.setIsLoading(true);
			if (!currentSolution.steps){
				const steps = await processCommand(command);
				actions.setSolutionSteps(steps);
			}
			actions.pushToViewStack({ type: "STEPS", expandedList: [], path: [] })
		} catch (err) {
			actions.setError(err instanceof Error ? err.message : 'Failed to load steps');
		} finally {
			actions.setIsLoading(false);
		}
	}

	return (
		<div>
			<div className="preview-container">
				<div>
					<LatexRenderer text={title} />
				</div>
				<div>
					<LatexRenderer text={problem} />
				</div>
				<div>
					<LatexRenderer text={method} />
				</div>
				<div>
					<LatexRenderer text={solution} />
				</div>
				<button
					onClick={() => {
						handleStepByStep(command)
					}}
				>Step-by-Step</button>
			</div>
			<div className="preview-list-container">
				{solutions.allIds.map((id) => (
					<div
						key={id}
						onClick={() => actions.setCurrentSolutionId(id)}
						className={`preview-list-entry ${currentSolutionId === id ? "active" : ""}`}
					>
						<LatexRenderer text={solutions.byId[id].preview.method} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SolutionPreviewView;
