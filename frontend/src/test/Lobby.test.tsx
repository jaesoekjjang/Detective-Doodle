import React, { lazy } from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';

const Lobby = lazy(() => import('../components/lobby'));

test('render main page', async () => {
  const { getByRole } = render(
    <Suspense fallback="loading...">
      <Lobby />
    </Suspense>,
    { wrapper: Router }
  );

  const link = await waitFor(() => getByRole('link', { name: /참가하기/i }));
  expect(link).toBeInTheDocument();
});
