export const getGenreUrl = (slug: string) => `/genre/${slug}`
export const getMovieUrl = (slug: string) => `/movie/${slug}`
export const getActorUrl = (slug: string) => `/actor/${slug}`

export const getAdminHomeUrl = () => `/manage`
export const getAdminUrl = (url: string) => `${getAdminHomeUrl()}/${url}`
