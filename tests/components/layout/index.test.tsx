import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Layout } from '~/components/layout';

describe('<Layout />', () => {
  it('render correctly component with name and isAuthPath false', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout name='Maria' isAuthPath={false}/>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('header')).toBeTruthy()
    expect(screen.queryByTestId('sidebar')).toBeTruthy()
  })

  it('render correctly component with name and isAuthPath true', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout name='Maria' isAuthPath={true}/>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('header')).toBeFalsy()
    expect(screen.queryByTestId('sidebar')).toBeFalsy()
  })
})