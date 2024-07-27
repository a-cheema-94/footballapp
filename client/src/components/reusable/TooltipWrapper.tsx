import { ReactNode } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

type Props = {
  children: ReactNode,
  message: string,
  styleProps: any
}

const TooltipWrapper = ({ children, message, styleProps }: Props) => {
  const renderTooltip = (props: any) => (
    <Tooltip {...props}>
      {message}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      {...styleProps}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  )
}

export default TooltipWrapper