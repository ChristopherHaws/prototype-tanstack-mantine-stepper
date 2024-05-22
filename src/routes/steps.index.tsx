import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/steps/')({
	beforeLoad: ({ context: { getCurrentStepNumber } }) => {
		if (!getCurrentStepNumber || getCurrentStepNumber() === 0) {
			// TODO: Determine the first incomplete step and redirect to that step instead
			throw redirect({
				to: '/steps/a',
			});
		}
	},
});
