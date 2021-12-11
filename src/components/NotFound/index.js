import {Redirect} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const goToHome = () => <Redirect to="/" />

  return (
    <div className="covid-error-view-container">
      <div className="notfound-card">
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/notfound_wxbwda.png"
          alt="not-found-pic"
          className="not-found-image"
        />
        <h1 className="notfound-heading">PAGE NOT FOUND</h1>
        <p className="notfound-description">
          we are sorry, the page you requested could not be found
        </p>
        <button type="button" onClick={goToHome} className="go-to-home-button">
          Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
