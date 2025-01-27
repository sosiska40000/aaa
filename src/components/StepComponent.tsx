import { useState } from "react";
import LatexRenderer from "./LatexRenderer";
import { SolutionStep } from "../types/types";

type StepComponentProps = {
	step: SolutionStep;
	stepIndex: number;
	onShowSubresult: (stepIndex: number, substepIndex: number) => void;
	isExpanded: boolean;
	onToggleExpansion: () => void;
};

const StepComponent: React.FC<StepComponentProps> = ({step, stepIndex, onShowSubresult, isExpanded: wasExpanded, onToggleExpansion}) => {
	const [isExpanded, setIsExpanded] = useState(wasExpanded);

	return (
		<div className="step-container">
			<div className="left">
				<div className="top-row">
					<LatexRenderer text={step.header} />
					<button onClick={() => {
						setIsExpanded(!isExpanded);
						onToggleExpansion();
					}}>{isExpanded ? "fold" : "expand"}</button>
				</div>
				<div className="bottom-row">
					<LatexRenderer text={step.substeps[0].left} />
				</div>
			</div>
			{isExpanded && (
				<div className="right">
					<div className="substeps">
						{step.substeps.map((substep, substepIndex) => (
							<div key={`substep-${substepIndex}`} className="substep">
								<div className="top-row">
									<div>
										<LatexRenderer text={substep.description} />
									</div>
									{substep.subresult && (<button onClick={() => onShowSubresult(stepIndex, substepIndex)} > ... </button>)}
								</div>
								<div className="bottom-row">
									<LatexRenderer text={substep.right} />
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			<hr />
		</div>
	);
};

export default StepComponent;
