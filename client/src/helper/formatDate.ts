export const formatDate = (date: any) => {
  let objectDate = new Date(date)
  return `${objectDate.getDate()}.${objectDate.getMonth() + 1}.${objectDate.getFullYear()}`
}