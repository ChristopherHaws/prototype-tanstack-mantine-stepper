import * as React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { queryOptions } from '@tanstack/react-query';
import { Button, Group, Stack } from '@mantine/core';

export const Route = createFileRoute('/steps/b')({
	component: StepB,
	staticData: {
		stepKey: 'step-b'
	},
	beforeLoad: () => {
		return {
			getCurrentStepNumber: () => 2 as number,
			aQueryOptions: queryOptions({
				queryKey: ['step-b'],
				queryFn: async () => {
					return await new Promise<string>((resolve) => {
						setTimeout(() => resolve('Data fetched for Step B'), 2000);
					});
				},
			}),
		};
	},
	loader: async ({ context: { queryClient, aQueryOptions } }) => {
		return {
			bData: await queryClient.ensureQueryData(aQueryOptions),
		};
	},
});

function StepB() {
	const { bData } = Route.useLoaderData();
	return (
		<Stack align="center">
			<p>{bData}</p>
			<Group>
				<Button component={Link} to="/steps/a" children="Back" />
				<Button component={Link} to="/steps/c" children="Next" />
			</Group>
		</Stack>
	);
}
