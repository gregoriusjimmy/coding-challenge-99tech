import { SVGProps } from "react";

const InfoCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.0026 20.1693C16.0443 20.1693 20.1693 16.0443 20.1693 11.0026C20.1693 5.96094 16.0443 1.83594 11.0026 1.83594C5.96094 1.83594 1.83594 5.96094 1.83594 11.0026C1.83594 16.0443 5.96094 20.1693 11.0026 20.1693Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 7.33594V11.9193"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.9922 14.6641H11.0004"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default InfoCircle;
