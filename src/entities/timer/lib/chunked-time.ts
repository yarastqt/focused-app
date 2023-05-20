export function getChunkedTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = String(Math.floor(totalSeconds / 60))
    .padStart(2, '0')
    .split('')
  const seconds = String(totalSeconds % 60)
    .padStart(2, '0')
    .split('')

  return [...minutes, ':', ...seconds]
}
