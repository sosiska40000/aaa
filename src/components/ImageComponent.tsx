import React from "react";
import { useSolutionStore } from "../store";

const ImageComponent: React.FC = () => {
	const { imageSrc } = useSolutionStore();
	return (
		<div className="image-section">
			<img src={imageSrc} alt="kartinka"/>
		</div>
	)
}

export default ImageComponent
