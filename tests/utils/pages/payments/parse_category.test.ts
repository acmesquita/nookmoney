import { parseCategory } from "~/utils/pages/payments/parse_category"

describe('Parse Category for Payments', () => {
  it('when call with invalid category', () => {
    //@ts-ignore
    expect(parseCategory('invalid')).toBe('')
  })

  it('when call with valid category when kind is conta_corrente', () => {
    expect(parseCategory('casa')).toBe('Casa')
  })
})