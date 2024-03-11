export const redis: {
  get(key: string): Promise<string | null>
  set(key: string, value: string, mode: string, duration: number): Promise<void>
}
