export function formateDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', {})
}

export function formatMonth(date: Date) {
  return `${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()}`
}