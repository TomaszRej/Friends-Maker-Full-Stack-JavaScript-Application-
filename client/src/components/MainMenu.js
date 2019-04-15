import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MainMenu extends Component {
  state = { activeItem: 'dashboard' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing vertical fluid>
        <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}