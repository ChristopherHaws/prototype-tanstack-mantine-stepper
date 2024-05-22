import * as React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { queryOptions } from '@tanstack/react-query';
import { Button, Group, Stack } from '@mantine/core';

export const Route = createFileRoute('/steps/a')({
	component: StepA,
	beforeLoad: () => {
		return {
			getCurrentStepNumber: () => 1 as number,
			aQueryOptions: queryOptions({
				queryKey: ['step-a'],
				queryFn: async () => {
					return await new Promise<string>((resolve) => {
						setTimeout(() => resolve('Data fetched for Step A'), 2000);
					});
				},
			}),
		};
	},
	loader: async ({ context: { queryClient, aQueryOptions } }) => {
		return {
			aData: await queryClient.ensureQueryData(aQueryOptions),
		};
	},
});

function StepA() {
	const { aData } = Route.useLoaderData();
	return (
		<Stack align="center">
			<p>{aData}</p>
			<Group>
				<Button children="Back" disabled />
				<Button component={Link} to="/steps/b" children="Next" />
			</Group>
		</Stack>
	);
}
