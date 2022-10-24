const category = {
  casa: "Casa",
  cartao_de_credito: "Cartão de crédito",
  doacao: "Doação",
  assinaturas_servicos: "Assinaturas e serviços",
}

export type Kind = 'casa' |
'cartao_de_credito' |
'doacao' |
'assinaturas_servicos'

export const parseCategory = (kind: Kind): string => category[kind] || '';
