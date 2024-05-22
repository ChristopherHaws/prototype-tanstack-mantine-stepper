import * as React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { queryOptions } from '@tanstack/react-query';
import { Button, Group, Stack } from '@mantine/core';

export const Route = createFileRoute('/steps/c')({
	component: StepC,
	staticData: {
		stepKey: 'step-c'
	},
	beforeLoad: () => {
		return {
			getCurrentStepNumber: () => 3 as number,
			aQueryOptions: queryOptions({
				queryKey: ['step-c'],
				queryFn: async () => {
					return await new Promise<string>((resolve) => {
						setTimeout(() => resolve('Data fetched for Step C'), 2000);
					});
				},
			}),
		};
	},
	loader: async ({ context: { queryClient, aQueryOptions } }) => {
		return {
			cData: await queryClient.ensureQueryData(aQueryOptions),
		};
	},
});

function StepC() {
	const { cData } = Route.useLoaderData();
	return (
		<Stack align="center">
			<p>{cData}</p>
			<Group>
				<Button component={Link} to="/steps/b" children="Back" />
				<Button component={Link} to="/steps/complete" children="Finish" />
			</Group>
		</Stack>
	);
}
