export function calculateBMI(weight: number, height: number) {
  return Math.round(weight / ((height / 100) * (height / 100)))
}
