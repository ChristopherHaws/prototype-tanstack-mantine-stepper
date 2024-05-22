import * as React from 'react';
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { Container, Divider, Group, LoadingOverlay } from '@mantine/core';

export type RootRouteContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Group justify="center" gap={32} pt={8}>
				<Link
					to="/"
					activeProps={{
						className: 'font-bold',
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>
				<Link
					to={'/steps'}
					activeProps={{
						className: 'font-bold',
					}}
				>
					Steps
				</Link>
			</Group>
			<Divider my={16} />
			<Container>
				<Outlet />
			</Container>

			{/* Start rendering router matches */}
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	);
}
