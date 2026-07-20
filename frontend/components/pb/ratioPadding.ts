export function ratioPadding({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (height / width) * 100 + '%'
}
