import './index.css'

const HomeCaseCardItem = props => {
  const {
    stateTotal,
    showActiveCases,
    showDeceasedCases,
    showRecoveredCases,
    showConfirmedCases,
  } = props
  const {confirmed, deceased, recovered, active} = stateTotal

  const activeConfirmedClass = showConfirmedCases
    ? 'confirmed-active-class'
    : ''
  const activeActiveClass = showActiveCases ? 'active-active-class' : ''

  const activeRecoveredClass = showRecoveredCases
    ? `recovered-active-class`
    : ''

  const activeDeceasedClass = showDeceasedCases ? `deceased-active-class` : ''

  return (
    <ul className="diff-type-cards">
      <li
        testid="countryWideConfirmedCases"
        // onClick={onClickConfirmed}
        className={`home-country-wide confirmed ${activeConfirmedClass}`}
      >
        <h1 className="case-card-heading">confirmed</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/check-mark_1_e83qpy.png"
          alt="country wide confirmed cases pic"
        />
        <p className="case-count confirmed">{confirmed}</p>
      </li>
      <li
        testid="countryWideActiveCases"
        // onClick={onClickActive}
        className={`home-country-wide active ${activeActiveClass}`}
        // className="country-wide active"
      >
        <h1 className="case-card-heading">Active</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/protection_1_roaazd.png"
          alt="country wide active cases pic"
        />
        <p className="case-count">{active}</p>
      </li>
      <li
        testid="countryWideRecoveredCases"
        // onClick={onClickRecovered}
        className={`home-country-wide recovered ${activeRecoveredClass}`}
        // className="country-wide recovered"
      >
        <h1 className="case-card-heading">Recovered</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/recovered_1_pz28bz.png"
          alt="country wide recovered cases pic"
        />
        <p className="case-count">{recovered}</p>
      </li>

      <li
        testid="countryWideDeceasedCases"
        // onClick={onClickDeceased}
        className={`home-country-wide deceased ${activeDeceasedClass}`}
        // className="country-wide deceased"
      >
        <h1 className="case-card-heading">Deceased</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/breathing_1_uxmvq9.png"
          alt="country wide deceased cases pic"
        />
        <p className="case-count">{deceased}</p>
      </li>
    </ul>
  )
}
export default HomeCaseCardItem
