import { formatMoney } from "~/utils/pages/format_money"

describe('Format value to money', () => {
  it('when call #formatMoney with value, returns format with money', () => {
    expect(formatMoney(1000)).toMatch('1.000,00')
  })
})