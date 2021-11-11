import './index.css'

const StateWiseRecord = props => {
  const {stateTotal} = props
  const {confirmed, deceased, recovered} = stateTotal
  console.log(stateTotal)
  return (
    <li className="state-total-record-card">
      <p className="state-name">AP</p>
      <p className="confirmed">{confirmed}</p>
      <p className="active">100</p>
      <p className="recovered">{recovered}</p>
      <p className="deceased">{deceased}</p>
      <p className="population">1</p>
    </li>
  )
}

export default StateWiseRecord
