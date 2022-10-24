import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '~/components/sidebar';

describe('<Header />', () => {
  it('render correctly component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    )

    expect(screen.queryByTestId('sidebar')).toBeTruthy()
    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText('Dashboard')).toHaveClass('active')
  })
})