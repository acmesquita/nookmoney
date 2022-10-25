import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from '~/components/sidebar';

describe('<Sidebar />', () => {
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

  it('render correctly component, when click in bank menu', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    )

    userEvent.click(screen.getByRole('link', { name: /banks/i }))

    await waitFor(() => {
      screen.getByTestId('sidebar')
      expect(screen.getByRole('link', { name: /banks/i })).toHaveClass('active')
    })
  })

  it('render correctly component, when click in payments menu', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    )

    userEvent.click(screen.getByRole('link', { name: /payments/i }))

    await waitFor(() => {
      screen.getByTestId('sidebar')
      expect(screen.getByRole('link', { name: /payments/i })).toHaveClass('active')
    })
  })

  it('render correctly component, when click in objective menu', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    )

    userEvent.click(screen.getByRole('link', { name: /objective/i }))

    await waitFor(() => {
      screen.getByTestId('sidebar')
      expect(screen.getByRole('link', { name: /objective/i })).toHaveClass('active')
    })
  })

  it('render correctly component, when click in reports menu', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    )

    userEvent.click(screen.getByRole('link', { name: /reports/i }))

    await waitFor(() => {
      screen.getByTestId('sidebar')
      expect(screen.getByRole('link', { name: /reports/i })).toHaveClass('active')
    })
  })
})