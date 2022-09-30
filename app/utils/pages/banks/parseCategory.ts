const category = {
  conta_corrente: 'Conta Corrente',
  conta_poupanca: 'Conta Poupança',
  investimento: 'Investimento',
  corretora: 'Corretora'
}

export type Kind = 'conta_corrente' |
'conta_poupanca' |
'investimento' |
'corretora'

export const parseCategory = (kind: Kind): string => category[kind] || ''
