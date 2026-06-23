import { SVGProps } from 'react'

export default function IconArrow({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      {...props}
    >
      <path
        d="M16 6.99951L8.81657 14L7.36221 12.5817L12.0618 8.00182H0V5.9972H12.0618L7.36221 1.41733L8.81657 0L16 6.99951Z"
        fill="#1E1A18"
      />
    </svg>
  )
}
