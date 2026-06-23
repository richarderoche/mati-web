export default function IconCopied({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 26 26"
      {...props}
    >
      <path
        fill="var(--color-blue)"
        d="M18.98 6.65a.63.63 0 0 1 1.04.7l-8.13 12a.62.62 0 0 1-.96.09l-4.87-4.9a.62.62 0 0 1 .88-.89l4.34 4.37 7.7-11.37Z"
      />
    </svg>
  )
}
