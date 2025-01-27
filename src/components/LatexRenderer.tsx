import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import {v4 as uuidv4} from "uuid";

const LatexPart: React.FC<{ text: string }> = ({ text }) => {
	const [isCopied, setIsCopied] = useState(false);
	const handleCopy = (str: string) => {
		navigator.clipboard.writeText(str).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 300);
		});
	};
	return (<span
		className={`math ${isCopied ? "copied" : ""}`}
		key={uuidv4()}
		onClick={() => handleCopy(text)}
	>
		<InlineMath math={text} />
	</span>)

}
const LatexRenderer: React.FC<{ text: string }> = ({ text }) => {
	const parts = text.split(/(\\\(.*?\\\))/g);

	return (
		<>
			{parts.map((p) => {
					const key = uuidv4();
					if (p.startsWith("\\(") && p.endsWith("\\)")){
						return <LatexPart key={key} text={p.slice(2, -2)} />
					}
					return <span key={key}>{p}</span>
				})
			}
		</>
	)
}
export default LatexRenderer;
