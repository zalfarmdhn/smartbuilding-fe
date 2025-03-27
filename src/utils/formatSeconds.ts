export const formatSeconds = (seconds: number): number => {
  if(seconds === null) return 30000
  return (seconds + 1) * 1000;
}