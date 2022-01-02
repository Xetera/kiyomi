export const slugify = (text: string) => text.trim().replace(/ /g, "-")

// should technically be calling decodeURIComponent here but
// slugs should in theory be URL friendly
export const unslugify = (text: string) => text.trim().replaceAll(/-/g, " ")
