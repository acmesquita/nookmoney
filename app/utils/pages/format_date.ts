export function formateDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', {})
}