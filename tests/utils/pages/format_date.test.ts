import { formateDate, formatMonth } from '~/utils/pages/format_date';

describe('Format Date Utils', () => {
  it('when call #formateDate with date, returns date format', () => {
    const result = formateDate(new Date('2000-01-01T03:00:00'))

    expect(result).toBe('01/01/2000')
  })

  it('when call #formatMonth with date, returns month format', () => {
    const result = formatMonth(new Date('2000-01-01T03:00:00'))

    expect(result).toBe('01/2000')
  })
})