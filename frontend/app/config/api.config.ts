export const API_URL = process.env.APP_URL

export const getAuthUrl = (endpoint: string = '') => `/auth/${endpoint}`
export const getUsersUrl = (endpoint: string = '') => `/users/${endpoint}`
export const getMoviesUrl = (endpoint: string = '') => `/movies/${endpoint}`
export const getGenresUrl = (endpoint: string = '') => `/genres/${endpoint}`
export const getActorsUrl = (endpoint: string = '') => `/actors/${endpoint}`
export const getRatingsUrl = (endpoint: string = '') => `/ratings/${endpoint}`
