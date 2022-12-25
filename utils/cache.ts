import { redis } from './redis'

const fetch = async (key: string, fetcherFunction: any, expires: number) => {
  const existing = await get(key)

  if (existing) return existing

  // only do the coingecko api call if there isn't a cached list in redis
  return set(key, fetcherFunction, expires)
}

const get = async (key: string) => {
  const value = await redis.get(key)
  if (value === null) return null
  return JSON.parse(value)
}

const set = async (key: string, fetcherFunction: any, expires: number) => {
  const value = await fetcherFunction()

  await redis.set(key, JSON.stringify(value), 'EX', expires)
  return value
}

const functions = { fetch, set }

export default functions
