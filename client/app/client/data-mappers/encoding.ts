export const slugify = (text: string) => text.trim().replace(/ /g, "-")

// should technically be calling decodeURIComponent here but
// slugs should in theory be URL friendly
export const unslugify = (text: string) => text.trim().replaceAll(/-/g, " ")

export const encodeUriFriendly = (id: number, readable?: string) => {
  if (!readable) {
    return String(id)
  }
  return `${id}-${slugify(readable)}`
}

export const decodeUriFriendly = (url: string) => {
  const [strId] = url.split("-")
  return Number(strId)
}
