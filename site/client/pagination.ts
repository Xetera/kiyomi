export function paginateBySkip(perPage: number) {
  return (_, all: ArrayLike<unknown>) => {
    const skip = all.length * perPage
    return skip
  }
}
