export const validatePageAndSize = (
  page: any,
  size: any
): [number, number] | string => {
  let pageAsNumber: number
  let sizeAsNumber: number

  if (!isNaN(Number(page)) && Number.isInteger(Number(page))) {
    pageAsNumber = Number.parseInt(page)
    if (pageAsNumber < 1) {
      pageAsNumber = 1
    }
  } else {
    return 'La página debe ser un número entero'
  }

  if (!isNaN(Number(size)) && Number.isInteger(Number(size))) {
    sizeAsNumber = Number.parseInt(size)
    if (sizeAsNumber < 1) {
      sizeAsNumber = 1
    }
  } else {
    return 'La tamaño debe ser un número entero'
  }

  return [pageAsNumber, sizeAsNumber]
}
