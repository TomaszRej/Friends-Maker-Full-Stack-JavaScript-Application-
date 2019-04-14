import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginModal, openRegisterModal}  from '../actions/layoutActions';

class MainMenu extends Component {
  state = {
    redirect: '',
    activeItem: 'home',
    loginModalOpen: false,
    registerModalOpen: false
  }

  handleItemClick = (e, { name }) => {
    const { openLoginModal, openRegisterModal } = this.props;
    //name === 'login' && this.setState({ loginModalOpen: !this.state.loginModalOpen})
      name === 'login' && openLoginModal();
      name === 'register' && openRegisterModal();

    //name === 'register' && this.setState({ registerModalOpen: true })
    
    name === 'home' && this.setState({ redirect: '/' })
    this.setState({ activeItem: name })
  }

  handleCloseLoginModal = () => this.setState({ loginModalOpen: false })
  handleCloseRegisterModal = () => this.setState({ registerModalOpen: false })
  handleOpenLoginModal = () => this.setState({ loginModalOpen: true })

  handleCloseModal = (e) => {
    e.preventDefault();
    console.log('rrrrrrrrrclosemodal');
    
    console.log(
      e.target.value
    );
    this.setState({
      loginModalOpen: false,
      registerModalOpen: false
    })
  }

 

  render() {
    const { activeItem, redirect } = this.state
    const { loginModalOpened, registerModalOpened} = this.props;
    console.warn(registerModalOpened, 'regModOpe');

    if (redirect !== '') {
      return <Redirect to={redirect} />
    }
    return (
      <>
        <Menu id="menu" secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        <LoginModal      modalOpen={loginModalOpened} //handleCloseLoginModal={this.handleCloseLoginModal} />
        />
        <RegisterModal  modalOpen={registerModalOpened} 
        // handleCloseRegisterModal={this.handleCloseRegisterModal} 
        handleOpenLoginModal={this.handleOpenLoginModal}
         /> 


         {/* <RegisterModal  modalOpen={this.state.registerModalOpen} handleCloseRegisterModal={this.handleCloseRegisterModal} handleOpenLoginModal={this.handleOpenLoginModal} />  */}
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    loginModalOpened: state.layout.loginModalOpened,
    registerModalOpened: state.layout.registerModalOpened
  }
}
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

export default connect(mapStateToProps, {openLoginModal, openRegisterModal })(MainMenu);