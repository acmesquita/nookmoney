import { render, screen } from '@testing-library/react';
import { Input } from '~/components/input';

describe('<Header />', () => {
  it('render correctly component when provider name, id and label', () => {
    render(<Input name='test' id='test' label='Test' />)

    expect(screen.queryByTestId('input')).toBeTruthy()
    expect(screen.getByText('Test')).toBeTruthy()
  })
  it('render correctly component when provider error', () => {
    render(<Input name='test' id='test' label='Test' errors={['invalid']} />)

    expect(screen.queryAllByTestId('input-error')).toHaveLength(1)
    expect(screen.queryAllByTestId('input-error')[0]).toHaveTextContent('invalid')
  })
})