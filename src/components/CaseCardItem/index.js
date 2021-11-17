import './index.css'

const CaseCardItem = props => {
  const {
    stateTotal,
    showConfirmed,
    showActive,
    showRecovered,
    showDeceased,
    showActiveCases,
    showDeceasedCases,
    showRecoveredCases,
    showConfirmedCases,
  } = props
  const {confirmed, deceased, recovered, active} = stateTotal
  // const stateName = name !== undefined ? name.state_name : null
  const onClickConfirmed = () => {
    showConfirmed()
  }

  const onClickActive = () => {
    showActive()
  }

  const onClickRecovered = () => {
    showRecovered()
  }

  const onClickDeceased = () => {
    showDeceased()
  }

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
        onClick={onClickConfirmed}
        className={`country-wide confirmed ${activeConfirmedClass}`}
        // className="country-wide confirmed "
      >
        <h1 className="case-card-heading">confirmed</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/check-mark_1_e83qpy.png"
          alt="country wide confirmed cases pic"
        />
        <p className="count">{confirmed}</p>
      </li>
      <li
        testid="countryWideActiveCases"
        onClick={onClickActive}
        className={`country-wide active ${activeActiveClass}`}
        // className="country-wide active"
      >
        <h1 className="case-card-heading">Active</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/protection_1_roaazd.png"
          alt="country wide active cases pic"
        />
        <p className="count">{active}</p>
      </li>
      <li
        testid="countryWideRecoveredCases"
        onClick={onClickRecovered}
        className={`country-wide recovered ${activeRecoveredClass}`}
        // className="country-wide recovered"
      >
        <h1 className="case-card-heading">Recovered</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/recovered_1_pz28bz.png"
          alt="country wide recovered cases pic"
        />
        <p className="count">{recovered}</p>
      </li>

      <li
        testid="countryWideDeceasedCases"
        onClick={onClickDeceased}
        className={`country-wide deceased ${activeDeceasedClass}`}
        // className="country-wide deceased"
      >
        <h1 className="case-card-heading">Deceased</h1>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/breathing_1_uxmvq9.png"
          alt="country wide deceased cases pic"
        />
        <p className="count">{deceased}</p>
      </li>
    </ul>
  )
}
export default CaseCardItem
