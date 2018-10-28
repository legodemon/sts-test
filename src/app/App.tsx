import * as React from 'react'

import {Container} from 'src/app/components/Container/Container'

import './style/style.scss'

const initialState: State = {
  items: [
    {
      id: 1,
      value: 'Хоккей',
      own: false,
      other: true
    },
    {
      id: 2,
      value: 'Высокоточная вёрстка под старые версии Microsoft Internet Explorer, начиная с версии 5.01',
      own: false,
      other: true
    },
    {
      id: 3,
      value: 'Баскетбол',
      own: false,
      other: true
    },
    {
      id: 4,
      value: 'Нарезка Photoshop/Fireworks макетов на скорость, в экстримельных условиях, на природе',
      own: false,
      other: true
    }
  ]
}

export interface Item {
  id: number
  value: string
  own: boolean
  other: boolean
}

interface State {
  items: Array<Item>
}

export class App extends React.Component<any, State> {

  constructor(props: any) {
    super(props)

    this.state = initialState
  }

  addItem = (value: string) => {
    const {items} = this.state

    items.push({
      id: items[items.length - 1].id + 1,
      own: true,
      other: false,
      value
    })
    this.setState({items})
  }

  removeItem = (id: number) => {
    const {items} = this.state
    const item: Item | undefined = items.find((item: Item) => item.id === id)
    if (item) {
      item.own = false
    }
    this.setState({items})
  }

  makeOwn = (id: number) => {
    const {items} = this.state
    const item: Item | undefined = items.find((item: Item) => item.id === id)
    if (item) {
      item.own = true
    }
    this.setState({items})
  }

  render() {
    const {items} = this.state

    return [
      <Container
        key={'own'}
        title={'О себе'}
        items={items.filter(({own}: Item) => own)}
        editable
        removeAction={this.removeItem}
        addAction={this.addItem}
        makeOwnAction={this.makeOwn}
      />,
      <Container
        key={'other'}
        title={'Интересы друга'}
        items={items.filter(({other}: Item) => other)}
        removeAction={this.removeItem}
        addAction={this.addItem}
        makeOwnAction={this.makeOwn}
      />
    ]
  }
}
