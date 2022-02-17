export function paginateBySkip(perPage: number) {
  return (_: any, all: ArrayLike<unknown>) => {
    const skip = all.length * perPage
    return skip
  }
}
