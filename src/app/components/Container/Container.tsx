import * as React from 'react'

import {Item} from 'src/app/App'
import {InterestItem} from 'src/app/components/Container/components/InterestItem'

import './Container.scss'

const DEFAULT_VISIBLE_ITEMS = 3

interface Props {
  title: string
  items: Array<Item>
  removeAction: (id: number) => void
  addAction: (value: string) => void
  makeOwnAction: (id: number) => void
  doWarn: (id: number) => void
  editable?: boolean
}

interface State {
  numberVisibleItems: number
}

export class Container extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      numberVisibleItems: DEFAULT_VISIBLE_ITEMS
    }
  }

  inputKeyPressHandler = (event: any) => {
    if ((event.keyCode === 13 || event.charCode === 13 || event.key === 'Enter')) {
      this.props.addAction(event.target.value)
      event.target.value = ''
    }
  }

  showMore = () => {
    const {items} = this.props
    this.setState({numberVisibleItems: items.length})
  }

  render() {
    const {title, editable, items, removeAction, makeOwnAction, doWarn} = this.props
    const {numberVisibleItems} = this.state
    const hiddenCount = items.length - numberVisibleItems

    return (
      <div className={'container'}>
        <div className={'title'}>{title}</div>
        <div className={'static'}>Хобби</div>
        {editable ?
          <div className={'input'}>
            <input placeholder={'Ведите текст'} onKeyPress={this.inputKeyPressHandler}/>
          </div>
          : null
        }
        <div className={'list'}>
          {items.map(({id, value, own, other}: Item, index: number) => {
            return index < numberVisibleItems ?
              <InterestItem
                id={id}
                key={`item${id}`}
                value={value}
                editable={editable}
                action={editable ? removeAction : makeOwnAction}
                doWarn={doWarn}
                both={own && other}
              />
              : null
          })}
          {hiddenCount > 0 ? <div className={'more'} onClick={this.showMore}>{`ещё ${hiddenCount} хобби`}</div> : null }
        </div>
      </div>
    )
  }
}
