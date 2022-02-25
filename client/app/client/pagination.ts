export const pagination = (req: Request, limit = 30) => {
  const params = new URL(req.url).searchParams
  const skip = Number(params.get("skip") ?? 0)
  const take = Number(params.get("take") ?? limit)
  return { skip, take, params }
}
export function paginateBySkip(perPage: number) {
  return (_: any, all: ArrayLike<unknown>) => {
    const skip = all.length * perPage
    return skip
  }
}
