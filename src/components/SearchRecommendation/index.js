import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

const SearchRecommendation = props => {
  const {state, allStates, timeLineData, gotoStateSpecificRoute} = props
  const {stateCode, stateName} = state

  const onClickSearchItem = () => {
    gotoStateSpecificRoute(stateCode)
  }
  return (
    <Link
      className="recommendation-link-item"
      to={{
        pathname: `/state/${stateCode}`,
        state: {stateWiseData: allStates, timeLineData},
      }}
      // to={`/state/${stateCode}`} state: {{states}}
    >
      <li className="recommendation-card" onClick={onClickSearchItem}>
        <p className="suggest-state-name">{stateName}</p>
        <div className="stateCode-item">
          <p className="state-code">{stateCode}</p>
          <BiChevronRightSquare className="right-square-icon" />
        </div>
      </li>
    </Link>
  )
}
export default SearchRecommendation
