// import {Component} from 'react'
// import StateWiseRecord from '../StateWiseRecord'
import './index.css'

const StateWiseData = props => {
  const {stateData} = props
  return (
    <div>
      <h1 className="heading">{stateData.total.confirmed}</h1>
    </div>
  )
}
export default StateWiseData
