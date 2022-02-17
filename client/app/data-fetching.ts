export const get = (
  query: string,
  variables: Record<string, unknown>
): Promise<Response> => {
  return fetch(`https://kiyomi.io/api/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
}
