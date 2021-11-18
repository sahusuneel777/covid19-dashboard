import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TimeLineData extends Component {
  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const singleTimeLineResultList = []
    const {location} = this.props
    const {state} = location
    const {timeLineData} = state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const keyNames = Object.keys(timeLineData)

    const singleState = keyNames.find(eachKey => eachKey === stateCode)
    singleTimeLineResultList.push(timeLineData[singleState])

    return singleTimeLineResultList
  }

  getAllDates = dates => {
    let sample = {}
    const keyNames = Object.keys(dates)

    keyNames.forEach(eachKey => {
      if (dates[eachKey]) {
        sample = dates[eachKey]
        // console.log(sample)
      }
    })
    return sample
  }

  convertAllDatesObjectintoConfirmedList = allDates => {
    const lastTenDatesConfirmed = []
    const lastTenDatesActive = []
    const lastTenDatesDeceased = []
    const lastTenDatesRecovered = []

    const keyNames = Object.keys(allDates)
    const reversedKeyNames = keyNames.reverse()

    reversedKeyNames.forEach(eachKey => {
      if (eachKey !== undefined) {
        const {delta} = allDates[eachKey]
        // console.log(delta.confirmed)
        const confirmed = delta.confirmed ? delta.confirmed : 0
        const deceased = delta.deceased ? delta.deceased : 0
        const recovered = delta.recovered ? delta.recovered : 0
        const tested = delta.tested ? delta.tested : 0

        if (lastTenDatesConfirmed.length < 10) {
          lastTenDatesConfirmed.push(confirmed)
        }
        // if (lastTenDatesDeceased.length < 10) {
        //   lastTenDatesConfirmed.push(deceased)
        // }
        // if (lastTenDatesRecovered.length < 10) {
        //   lastTenDatesConfirmed.push(recovered)
        // }
        // if (lastTenDatesActive.length < 10) {
        //   lastTenDatesConfirmed.push(tested)
        // }
      }
    })
    return lastTenDatesConfirmed
  }

  render() {
    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()
    // console.log(singleTimeLineDataList)

    const [dates] = singleTimeLineDataList
    // const {dates} = dates
    console.log(dates)

    const allDates = this.getAllDates(dates)
    console.log(allDates)

    const tenDaysConfirmedCases = this.convertAllDatesObjectintoConfirmedList(
      allDates,
    )
    // const tenDaysActiveCases = this.convertAllDatesObjectintoConfirmedList()
    // console.log(tenDaysConfirmedCases)

    return (
      <div>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
      </div>
    )
  }
}

export default withRouter(TimeLineData)
