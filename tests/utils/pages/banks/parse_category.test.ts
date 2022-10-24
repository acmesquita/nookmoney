import { parseCategory } from "~/utils/pages/banks/parse_category"

describe('Parse Category for Banks', () => {
  it('when call with invalid category', () => {
    //@ts-ignore
    expect(parseCategory('invalid')).toBe('')
  })

  it('when call with valid category when kind is conta_corrente', () => {
    expect(parseCategory('conta_corrente')).toBe('Conta Corrente')
  })
})