const API_URL = import.meta.env.VITE_API_URL

const delay = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const fetchPersonas = async ({ pageParam = 1, query }) => {
  await delay(300)
  const res = await fetch(
    `${API_URL}/personas/?search=${query}&page=${pageParam}&size=10`)
    
    if (!res.ok) {
      throw new Error("Error en la petición")
    }

    const data = await res.json()

    const nextCursor = data.page >= data.pages ? undefined : data.page + 1

    return {
      items: data.items,
      nextCursor,
      total: data.total,
    }
}
