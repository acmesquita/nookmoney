import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MainWithHeader } from '~/components/page_header';

describe('<MainWithHeader />', () => {
  it('render correctly component with title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainWithHeader title='Test'/>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('main-container')).toBeTruthy()
    expect(screen.getByText('Test')).toBeTruthy()
  })

  it('render correctly component with title and actions', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainWithHeader
          title='Test'
          actions={[
            { to: '/test', className: 'btn', title: 'button'},
            { to: '', className: 'btn', title: '2002-02', handle: jest.fn()},
          ]}
        />
      </MemoryRouter>
    )

    expect(screen.queryByTestId('main-container')).toBeTruthy()
    expect(screen.getByText('Test')).toBeTruthy()
    expect(screen.getByText('button')).toBeTruthy()
    expect(screen.getByText('02/2002')).toBeTruthy()
  })
})