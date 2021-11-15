import {Component} from 'react'
import './index.css'

class StateSpecificDetails extends Component {
  state = {allStatesData: []}

  componentDidMount() {
    this.getStateSpecificDetails()
  }

  getStateSpecificDetails = async () => {
    const {match} = this.props
    // console.log(match)
    const {params} = match
    const {stateCode} = params
    // console.log(stateCode)
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({allStatesData: fetchedData})
    }
  }

  render() {
    const {allStatesData} = this.state
    console.log(allStatesData)
    return (
      <div className="state-specific-details-route">
        <div className="state-name-container">m</div>
        <div className="tested-count-container">
          <p>Tested</p>
          <p>{}</p>
        </div>
      </div>
    )
  }
}

export default StateSpecificDetails
