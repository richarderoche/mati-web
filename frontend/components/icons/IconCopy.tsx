export default function IconCopy({ ...props }: React.SVGProps<SVGSVGElement>) {
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
        fill="var(--color-display)"
        fillRule="evenodd"
        d="M18 5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-1v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V8a3 3 0 0 1 3-3h6ZM8 10a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H8Zm6-1a3 3 0 0 1 3 3v4h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h4Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
