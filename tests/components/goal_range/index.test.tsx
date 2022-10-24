import React from 'react';
import { render, screen } from '@testing-library/react';
import { GoalRange } from '~/components/goal_range';

describe('<GoalRange />', () => {
  it('render correctly component when provider just endValue', () => {
    render(<GoalRange endValue={100} />)

    expect(screen.queryByTestId('goal-range')).toBeTruthy()
  })

  it('render correctly component when provider value and endValue', () => {
    render(<GoalRange endValue={100} value={10} />)
    const goalRange = screen.queryByTestId('goal-range')

    expect(goalRange?.querySelector('input')?.value).toBe('10')
  })
})