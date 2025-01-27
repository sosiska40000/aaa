import { create } from "zustand";
import { AppView, Solution, SolutionPreview, SolutionStep } from "./types/types";
import { v4 as uuidv4 } from "uuid"

type SolutionId = string;

type SolutionsStore = {
	solutions: {
		allIds: string[];
		byId: Record<string, Solution>
	}
	imageSrc: string;
	isLoading: boolean;
	error: string | null;
	selectedSolutionId: SolutionId;
	viewStack: AppView[];
	currentView: AppView;
	
	actions: {
		setCurrentSolutionId: (id: SolutionId) => void;
		pushToViewStack: (view: AppView) => void;
		goBack: () => void;
		setSolutionPreviews: (previews: SolutionPreview[]) => void;
		setSolutionSteps: (steps: SolutionStep[]) => void;
		setIsLoading: (isLoading: boolean) => void;
		setError: (error: string | null) => void;
		setImageSrc: (src: string) => void;
	}
}

export const useSolutionStore = create<SolutionsStore>((set) => ({
	solutions: {allIds: [], byId: {}},
	viewStack: [{ type: "DEFAULT" }],
	currentView: { type: "DEFAULT" },
	selectedSolutionId: "",
	expandedSteps: {},
	isLoading: false,
	error: null,
	imageSrc: "placeholder.jpg",

	actions: {
		setCurrentSolutionId: (id: SolutionId) => {
			set({ selectedSolutionId: id })
		},
		pushToViewStack: (view: AppView) => {
			set((state) => ({
				viewStack: [...state.viewStack, view],
				currentView: view
			}))
		},
		goBack: () => {
			set((state) => {
				const newStack = state.viewStack.slice(0,-1);
				return {
					viewStack: newStack,
					currentView: newStack[newStack.length-1]
				}
			})
		},
		setSolutionPreviews: (previews) => {
			const initialAcc: { allIds: SolutionId[]; byId: Record<SolutionId, Solution> } = {
				allIds: [],
				byId: {}
			};

			const previewsNormalized = previews.reduce((acc, preview) => {
				const id = uuidv4();
				acc.allIds.push(id);
				acc.byId[id] = { preview: preview, };
				return acc;
			}, initialAcc);

			set({ solutions: previewsNormalized })
		},
		setSolutionSteps: (steps) => {
			set((state) => {
				const id = state.selectedSolutionId
				return {
				solutions: {
					...state.solutions,
					byId: {
						...state.solutions.byId,
						[id]: {
							...state.solutions.byId[id],
							steps: steps
						}
					}
				}
			}})
		},
		setIsLoading: (isLoading) => set({ isLoading }),
		setError: (error) => set({error}),
		setImageSrc: (src) => set({imageSrc: src})
	}
}))
