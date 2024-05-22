import { Store } from '@tanstack/store';

export type StepStatus = 'pending' | 'dirty' | 'complete';
export type StepName = keyof typeof stepsStore.state;

export const stepsStore = new Store({
	stepA: 'pending' as StepStatus,
	stepB: 'pending' as StepStatus,
	stepC: 'pending' as StepStatus,
});

export const setStepStatus = (step: StepName, status: StepStatus) => {
	stepsStore.setState((state) => {
		return {
			...state,
			[step]: status,
		};
	});
};

export function getCurrentStep(): { index: number; name: StepName } {
	if (stepsStore.state.stepA !== 'complete') {
		return { index: 0, name: 'stepA' };
	}

	if (stepsStore.state.stepB !== 'complete') {
		return { index: 1, name: 'stepB' };
	}

	if (stepsStore.state.stepC !== 'complete') {
		return { index: 2, name: 'stepC' };
	}

	return { index: 0, name: 'stepA' };
}
