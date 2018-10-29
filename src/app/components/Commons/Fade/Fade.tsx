import * as React from 'react'
import Transition, { TransitionProps } from 'react-transition-group/Transition'

export enum FadeStatus {
  ENTERED = 'entered',
  ENTERING = 'entering'
}

interface Props extends TransitionProps {
  preventMountOnEnter?: boolean
  preventUnmountOnExit?: boolean
  duration?: number
  onClick?: (...args: any[]) => void
}

const transitionStyles = new Map<FadeStatus, object>([
  [FadeStatus.ENTERING, { opacity: 0 }],
  [FadeStatus.ENTERED, { opacity: 1 }]
])

export class Fade extends React.Component<Props> {
  onClickHandler = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { onClick } = this.props
    if (onClick) {
      onClick()
    }
  }

  render () {
    const { preventMountOnEnter, preventUnmountOnExit, duration } = this.props

    const defaultStyle = {
      transition: `opacity ${duration ? duration : 200}ms ease-in-out`,
      opacity: 0
    }

    return <Transition
      mountOnEnter={!preventMountOnEnter}
      unmountOnExit={!preventUnmountOnExit}
      {...this.props}>
      {(state: FadeStatus) =>
        <div onClick={this.onClickHandler} className={this.props.className}
             style={{ ...defaultStyle, ...transitionStyles.get(state) }}>
          {this.props.children}
        </div>
      }
    </Transition>
  }
}
