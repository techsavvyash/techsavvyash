import styles from "./styles/resume.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Resume: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <a
      href="/static/Yash_Mittal_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class={classNames(displayClass, "resume-link")}
      aria-label="Resume"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <title>Resume</title>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
        <line x1="9" y1="9" x2="10" y2="9" />
      </svg>
    </a>
  )
}

Resume.css = styles

export default (() => Resume) satisfies QuartzComponentConstructor
