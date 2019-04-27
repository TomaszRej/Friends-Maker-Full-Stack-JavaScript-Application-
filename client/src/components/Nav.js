import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import ForgotPasswordModal from './auth/ForgotPasswordModal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginModal, openRegisterModal } from '../actions/layoutActions';
import { logout } from '../actions/authActions';

class MainMenu extends Component {
  state = {
    // redirect: '',
    activeItem: '',
    loginModalOpen: false,
    registerModalOpen: false,
    forgotPasswordOpen: false
  }

  handleItemClick = (e, { name }) => {
    const { openLoginModal, openRegisterModal, logout } = this.props;
    //name === 'login' && this.setState({ loginModalOpen: !this.state.loginModalOpen})
    name === 'login' && openLoginModal();
    name === 'register' && openRegisterModal();
    name === 'logout' && logout();

    //name === 'register' && this.setState({ registerModalOpen: true })

    name === 'home' && this.setState({ activeItem: name });
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
    const { loginModalOpened, registerModalOpened,forgotPasswordOpened, user } = this.props;
    console.warn(this.props.user, 'user NAV !!!!!!!!!!!!!!!!!!');

    // if (redirect !== '') {
    //   return <Redirect to={redirect} />
    // }
    return (
      <>
        <Menu id="menu" secondary>
          {user
            ?
            <Menu.Menu position='right'>
              <Menu.Item>
                <Icon circular name="user" />
                <span>{this.props.user.name}</span>
              </Menu.Item>
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
            :
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
          }
        </Menu>
        <LoginModal
          modalOpen={loginModalOpened}
        />
        <RegisterModal
          modalOpen={registerModalOpened}
          handleOpenLoginModal={this.handleOpenLoginModal}
        />
        <ForgotPasswordModal
          modalOpen={true}
        />




        {/* <RegisterModal  modalOpen={this.state.registerModalOpen} handleCloseRegisterModal={this.handleCloseRegisterModal} handleOpenLoginModal={this.handleOpenLoginModal} />  */}
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loginModalOpened: state.layout.loginModalOpened,
    registerModalOpened: state.layout.registerModalOpened
  }
}
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

export default connect(mapStateToProps, { openLoginModal, openRegisterModal, logout })(MainMenu);