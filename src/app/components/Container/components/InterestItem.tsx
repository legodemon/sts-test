import * as React from 'react'
import classNames from 'classnames'

import './InterestItem.scss'

interface Props {
  id: number
  value: string
  action: (id: number) => void
  editable?: boolean
  hidden: boolean
  both: boolean
}

export class InterestItem extends React.Component<Props> {

  actionClickHandler = () => {
    const {id, action} = this.props

    action(id)
  }

  warningClickHandler = () => {
    console.log('warn')
  }

  render() {
    const {editable, value, hidden, both} = this.props

    return (
      <div className={classNames('item', {['hidden']: hidden})}>
        <div className={classNames('action', {['remove']: editable, ['add']: !editable})} onClick={this.actionClickHandler}/>
        <div className={'value'}>{value}</div>
        {!editable ? <div className={'warning'} onClick={this.warningClickHandler}>пожаловаться</div> : null}
        {!editable && both ? <div className={'added'}>Добавлено в ваши увлечения</div> : null}
      </div>
    )
  }
}
