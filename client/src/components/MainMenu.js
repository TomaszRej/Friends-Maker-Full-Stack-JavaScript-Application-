import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom';

export default class MainMenu extends Component {
  state = {
    activeItem: 'dashboard',
    redirect: ''
  }

  handleClick = (e, name) => {
    e.preventDefault();

    console.log(name, 'name')


    //console.log(name, 'name w click hanflde')
    this.setState({
      activeItem: name.name,
       redirect: name.name
    }, () => { console.log(this.state.redirect, 'callback setSTtate MAinMenu') })
  }

  render() {
    const { activeItem, redirect } = this.state

    console.log(activeItem, redirect, 'w render');


    if (redirect !== '') {
      return <Redirect to={redirect} />
    }





    return (


    <Menu vertical>
      <Menu.Item href='//google.com' target='_blank'>
        Visit Google
</Menu.Item>
      <Menu.Item link>Link via prop</Menu.Item>
      <Menu.Item name='profile' link onClick={this.handleClick}>Javascript Link</Menu.Item>
    </Menu>
    )
  }
}