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
  state = {
    timeLineData: [],
  }

  componentDidMount() {
    this.getTimeLineData()
  }

  getTimeLineData = async () => {
    const timeLineApiUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(timeLineApiUrl, options)
    const fetchedData = await response.json()
    this.setState({timeLineData: fetchedData})
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const singleTimeLineResultList = []
    const {timeLineData} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    // console.log(stateCode)

    const keyNames = Object.keys(timeLineData)

    const singleState = keyNames.find(eachKey => eachKey === stateCode)
    singleTimeLineResultList.push(timeLineData[singleState])

    return singleTimeLineResultList
  }

  //   convertDatesObjectIntoList = dates => {
  //     const lastTenDates = []
  //     const keyNames = Object.keys(dates)
  //     keyNames.forEach(eachKey => {
  //       if (dates[eachKey]) {
  //         lastTenDates.push(eachKey)
  //       }
  //     })
  //     return lastTenDates
  //   }

  render() {
    const {timeLineData} = this.state
    //  let sampleDate = {}

    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()
    console.log(singleTimeLineDataList)

    const [dates] = singleTimeLineDataList
    // const {dates} = dates

    console.log(dates)
    // const keyNameList = Object.keys(dates)
    // keyNameList.forEach(each => {
    //   console.log(each)
    //   return 0
    // })
    // const datesList = this.convertDatesObjectIntoList(dates)

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
