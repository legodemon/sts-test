import * as React from 'react'
import classNames from 'classnames'

import './InterestItem.scss'
import {Fade} from 'src/app/components/Commons/Fade/Fade'

interface Props {
  id: number
  value: string
  action: (id: number) => void
  doWarn: (id: number) => void
  editable?: boolean
  both: boolean
}

interface State {
  show: boolean
}

export class InterestItem extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      show: false
    }
  }

  actionClickHandler = () => {
    const {id, action} = this.props
    action(id)
  }

  componentDidMount() {
    const {show} = this.state

    if (!show) {
      window.setTimeout(() => this.setState({show: true}), 200)
    }
  }

  warningClickHandler = () => {
    const {doWarn, id} = this.props
    doWarn(id)
  }

  render() {
    const {editable, value, both} = this.props
    const {show} = this.state

    return (
      <Fade timeout={0} duration={200} in={show} className={'item'}>
        <div className={classNames('action', {['remove']: editable, ['add']: !editable})} onClick={this.actionClickHandler}/>
        <div className={'value'}>{value}</div>
        {!editable ? <div className={'warning'} onClick={this.warningClickHandler}>пожаловаться</div> : null}
        <Fade timeout={0} in={!editable && both}>
          <div className={'added'}>Добавлено в ваши увлечения</div>
        </Fade>
      </Fade>
    )
  }
}
