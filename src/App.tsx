import React, { useEffect } from 'react'
import { useSolutionStore } from './store';
import ImageComponent from './components/ImageComponent';
import SolutionPreviewView from './components/SolutionPreviewView';
import SolutionStepsView from './components/SolutionStepsView';
import "./App.css";
import convertToJPEG from './utils/convertToJpeg';
import { processImage } from './utils/api';

const App: React.FC = () => {

	const { currentView, isLoading, error, actions } = useSolutionStore();
	
	const handlePaste = async (e: ClipboardEvent) => {
		try {
			actions.setError(null);
			actions.setIsLoading(true);
			if (!e.clipboardData) return;
			const items = e.clipboardData.items;
			if (!items || !items.length || !items[0] || items[0].type.indexOf("image") === -1) return;
			const file = items[0].getAsFile();
			if (!file) return;
			actions.setImageSrc(URL.createObjectURL(file));

			const imageBlob = await convertToJPEG(file);
			const previews = await processImage(imageBlob);
			actions.setSolutionPreviews(previews);
		} catch (err) {
			actions.setError(err instanceof Error ? err.message : 'Failed to process image');
		} finally {
			actions.setIsLoading(false);
		}
	};
	
	useEffect(()=>{
		document.addEventListener("paste", handlePaste);
		return () => document.removeEventListener("paste", handlePaste);
	},[])

	return (
		<>
			<ImageComponent />
			{isLoading && <div>loading</div>}
			{error && <div>{error}</div>}
			{currentView.type === "DEFAULT" && <div>piska</div>}
			{currentView.type === "PREVIEW" && <SolutionPreviewView />}
			{currentView.type === "STEPS" && <SolutionStepsView />}
		</>
	);
}
export default App
