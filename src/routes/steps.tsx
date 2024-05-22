import * as React from 'react';
import { Stepper } from '@mantine/core';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { stepsStore, setStepStatus, getCurrentStep } from '../domain/steps';

export type StepName = 'step-a' | 'step-b' | 'step-c' | 'complete';
export type StepStatus = 'pending' | 'dirty' | 'complete';

export const Route = createFileRoute('/steps')({
	component: StepsLayout,
	// meta: {},

	beforeLoad: ({ context }) => {
		return {
			getCurrentStepNumber: () => null as number | null,
			steps: {
				status: stepsStore,
				setStepStatus,
				getCurrentStep,
			},
		};
	},
});

function StepsLayout() {
	const { steps } = Route.useRouteContext();

	return (
		<Stepper
			active={steps.getCurrentStep().index}
			allowNextStepsSelect={false}
			orientation="horizontal"
		>
			<Stepper.Step label="Step A">
				<Outlet />
			</Stepper.Step>

			<Stepper.Step label="Step B">
				<Outlet />
			</Stepper.Step>

			<Stepper.Step label="Step C">
				<Outlet />
			</Stepper.Step>

			<Stepper.Completed>
				<Outlet />
			</Stepper.Completed>
		</Stepper>
	);
}
