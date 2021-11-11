import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    displaySmNavItems: false,
  }

  onClickNavBarIcon = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  onClickCloseNav = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  render() {
    const {displaySmNavItems} = this.state

    return (
      <div className="header-container">
        <div className="nav-bar-sm-container">
          <h1 className="logo-heading">
            COVID19<span className="india">INDIA</span>
          </h1>
          <button
            type="button"
            onClick={this.onClickNavBarIcon}
            className="navigation-btn"
          >
            <img
              src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521129/mini-project/nav-bar-icon-sm_uee2un.png"
              alt="nav-bar-icon"
              className="nav-bar-icon"
            />
          </button>
        </div>
        {displaySmNavItems && (
          <div className="nav-sm-controls">
            <ul className="sm-controls">
              <li className="nav-item">Home</li>
              <li className="nav-item">About</li>
            </ul>
            <button
              testid="close-nav-btn"
              className="close-nav-btn"
              type="button"
              onClick={this.onClickCloseNav}
            >
              <img
                src="https://res.cloudinary.com/dnv6kesmt/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1636521128/mini-project/cross-icon_jezz2z.png"
                alt="close nav btn"
                className="close-nav-btn"
              />
            </button>
          </div>
        )}
        <div className="nav-bar-large-container">
          <h1 className="logo-heading">
            COVID19<span className="india">INDIA</span>
          </h1>
          <ul className="nav-controls">
            <li className="nav-item">Home</li>
            <li className="nav-item">About</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Header
