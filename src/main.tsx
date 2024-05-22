import '@mantine/core/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	ErrorComponent,
	RouterProvider,
	createRouter,
} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingOverlay, MantineProvider, Title } from '@mantine/core';

console.log(QueryClient);

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultPendingComponent: () => <LoadingOverlay visible />,
	defaultErrorComponent: ErrorComponent,
	defaultNotFoundComponent: () => <Title>Not Found =(</Title>,
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	// https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#passing-all-loader-events-to-an-external-cache
	defaultPreloadStaleTime: 0,
	defaultPendingMs: 500,
	defaultPendingMinMs: 250,
	context: { queryClient },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</MantineProvider>
	);
}
