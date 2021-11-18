import './index.css'

const NotFound = () => (
  <div className="covid-error-view-container">
    <div className="notfound-card">
      <img
        src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/notfound_wxbwda.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="notfound-heading">PAGE NOT FOUND</h1>
      <p className="notfound-description">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <button type="button" className="go-to-home-button">
        Home
      </button>
    </div>
  </div>
)

export default NotFound
