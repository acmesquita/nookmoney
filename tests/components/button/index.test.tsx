import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Button, DateMonth } from '~/components/button';

describe('<Button />', () => {
  it('render correctly component when provider just children', () => {
    render(<Button>btn</Button>)

    const btn = screen.queryByTestId('button')

    expect(btn).toBeTruthy()
    expect(btn).toHaveClass('btn')
    expect(btn).toHaveClass('btn-primary')
    expect(btn).toHaveTextContent('btn')
  })

  it('render correctly component when provider href', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Button href='/test'>btn</Button>
      </MemoryRouter>
    )

    const btnLink = screen.queryByTestId('button-link')

    expect(btnLink).toBeTruthy()
    expect(btnLink).toHaveClass('btn')
    expect(btnLink).toHaveClass('btn-primary')
    expect(btnLink).toHaveTextContent('btn')
  })
})

describe('<DateMonth />', () => {
  it('render correctly component when provider date and handleSubmit', async () => {
    const handleSubmit = jest.fn()
    render(<DateMonth date='2002-02-01' handleSubmit={handleSubmit}/>)

    const dateMonth = screen.queryByTestId('button')

    expect(dateMonth).toBeTruthy()
    expect(dateMonth).toHaveTextContent('01/2002')

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('button'))
      fireEvent.click(
        screen.getByRole('option', {
          name: /choose december 2002/i,
        })
      );

      expect(screen.queryByTestId('button')).toHaveTextContent('12/2002')
    })

  })
})