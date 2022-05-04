import React, { lazy } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';

const Lobby = lazy(() => import('../components/lobby'));
const NotFound = lazy(() => import('../components/not-found'));

describe('<App />', () => {
  it('should render lobby page on default route', async () => {
    const { getByText, findByRole } = render(
      <Router initialEntries={['/']}>
        <Suspense fallback="loading...">
          <Lobby />
        </Suspense>
      </Router>
    );

    expect(getByText('loading...')).toBeInTheDocument();

    const link = await findByRole('link', { name: /참가하기/i });
    expect(link).toBeInTheDocument();
  });

  it('should render not-found page when landed on a bad page', async () => {
    const { findByRole, getByText } = render(
      <Router initialEntries={['/bad-route']}>
        <Suspense fallback="loading...">
          <NotFound />
        </Suspense>
      </Router>
    );

    expect(getByText('loading...')).toBeInTheDocument();

    const heading = await findByRole('heading', { name: /404 not found/i });
    expect(heading).toBeInTheDocument();
  });
});
