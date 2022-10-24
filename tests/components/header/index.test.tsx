import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '~/components/header';

describe('<Header />', () => {
  it('render correctly component when provider name', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header name='Maria' />
      </MemoryRouter>
    )

    expect(screen.queryByTestId('header')).toBeTruthy()
    expect(screen.getByText('Olá, Maria')).toBeTruthy()
  })
})