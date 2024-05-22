import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/steps/complete')({
	staticData: {
		stepKey: 'complete',
	},
	beforeLoad: () => {
		return {
			getCurrentStepNumber: () => 4 as number,
		};
	},
	component: () => <div>Completed!</div>,
});
