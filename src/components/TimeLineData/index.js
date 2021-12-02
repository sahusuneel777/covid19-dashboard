import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'

import {
  LineChart,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

// const format = require('date-fns/format')
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TimeLineData extends Component {
  state = {
    // activeTrend: `cumulative`,
    timeLineData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTimeData()
  }

  getTimeData = async () => {
    const timeLineUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(timeLineUrl, options)
    const fetchedTimeLineData = await response.json()

    this.setState({
      timeLineData: fetchedTimeLineData,
      apiStatus: apiStatusConstants.success,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const singleTimeLineResultList = []
    const {match} = this.props
    const {timeLineData} = this.state
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
      }
    })
    return sample
  }

  convertLastAllDatesObjectIntoAList = allDates => {
    const lastTenDates = []
    const keyNames = Object.keys(allDates)
    const reversedKeyNames = keyNames.reverse()
    // console.log(`reversedKeyNames`, reversedKeyNames)
    reversedKeyNames.forEach(eachKey => {
      if (eachKey !== undefined) {
        const {delta} = allDates[eachKey]
        // console.log(delta.confirmed)
        const recoveredCases = delta.recovered ? delta.deceased : 0
        const confirmedCases = delta.confirmed ? delta.confirmed : 0
        const deceasedCases = delta.deceased ? delta.deceased : 0
        const activeCases = confirmedCases - (deceasedCases + recoveredCases)
        const tested = delta.tested ? delta.tested : 0
        const vaccinated = delta.vaccinated1 ? delta.vaccinated1 : 0

        const dateObject = {}
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        const month = monthNames[new Date(eachKey).getUTCMonth() + 1]
        const date = new Date(eachKey).getUTCDate()

        dateObject.date = `${date} ${month}`

        dateObject.confirmed = confirmedCases
        dateObject.recovered = recoveredCases
        dateObject.deceased = deceasedCases
        dateObject.active = activeCases
        dateObject.tested = tested
        dateObject.vaccinated = vaccinated
        if (lastTenDates.length < 10) {
          lastTenDates.push(dateObject)
        }
      }
    })
    return lastTenDates.reverse()
  }

  getLastDateOfMonth = allDates => {
    const lastDates = []
    const cumulativeDates = []
    let uniqueCumulativeDates = []
    const keyNames = Object.keys(allDates)
    console.log(`keyNames`, keyNames)
    keyNames.forEach(eachKey => {
      const dateString = eachKey
      const date = Date.parse(dateString)
      const dateStamp = new Date(date)
      const lastDateOfMonth = new Date(
        dateStamp.getFullYear(),
        dateStamp.getMonth() + 1,
        0,
      )
      const formattedDate = format(new Date(lastDateOfMonth), 'yyyy-MM-d')
      cumulativeDates.push(formattedDate)
      uniqueCumulativeDates = [...new Set(cumulativeDates)]
      console.log(`uniqueCumulativeDates`, uniqueCumulativeDates)

      if (!lastDates.includes(`${lastDateOfMonth}`)) {
        lastDates.push(format(new Date(lastDateOfMonth), 'MMM Y').toString())
      }
    })
    return {lastDates, uniqueCumulativeDates}
  }

  renderBarChart = lastTenDaysCases => (
    <div className="graph-container">
      <h1 className="bar-graph-heading">Bar Chart</h1>

      {/* <ResponsiveContainer width="85%" height={400} margin={10}> */}
      <div className="bar-chart-wrapper">
        <BarChart
          width={500}
          height={350}
          stroke="#9A0E31"
          data={lastTenDaysCases}
          // margin={{top: 5, right: 30, left: 20, bottom: 15}}
          className="bar-confirmed-chart"
        >
          {/* <CartesianGrid strokeDasharray="" /> */}
          <XAxis
            dataKey="date"
            stroke="#9A0E31"
            axisLine={{stroke: '#331427'}}
          />
          <YAxis stroke="#9A0E31" axisLine={{stroke: '#331427'}} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="confirmed"
            fill="#9A0E31"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
      {/* <ResponsiveContainer width="85%" height={400} margin={10}> */}
      <div className="bar-chart-wrapper">
        <BarChart
          width={500}
          height={350}
          stroke="#0A4FA0"
          data={lastTenDaysCases}
          className="bar-active-chart"
        >
          {/* <CartesianGrid strokeDasharray="" /> */}
          <XAxis
            dataKey="date"
            stroke="#0A4FA0"
            axisLine={{stroke: '#161625'}}
          />
          <YAxis axisLine={{stroke: '#161625'}} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="active"
            fill="#0A4FA0"
            className="bar-active-chart"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
      {/* </ResponsiveContainer> */}
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="bar-chart-wrapper">
        <BarChart
          width={500}
          height={350}
          stroke="#216837"
          data={lastTenDaysCases}
          className="bar-recovered-chart"
        >
          {/* <CartesianGrid strokeDasharray="" /> */}
          <XAxis
            dataKey="date"
            stroke="#216837"
            axisLine={{stroke: '#161625'}}
          />
          <YAxis axisLine={{stroke: '#161625'}} />
          <Tooltip />

          <Legend />
          <Bar
            dataKey="recovered"
            fill="#216837"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
      {/* </ResponsiveContainer> */}
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="bar-chart-wrapper">
        <BarChart
          width={800}
          height={350}
          stroke="#474C57"
          data={lastTenDaysCases}
          className="bar-deceased-chart"
        >
          {/* <CartesianGrid strokeDasharray="" /> */}
          <XAxis
            dataKey="date"
            stroke="#474C57"
            axisLine={{stroke: '#161625'}}
          />
          <YAxis axisLine={{stroke: '#161625'}} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="deceased"
            fill="#474C57"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  )

  renderLineChart = dataForCumulative => (
    <div className="graph-container" testid="lineChartsContainer">
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={300}
          data={dataForCumulative}
          className="bar-confirmed-chart"
          Legend="confirmed"
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="month"
            label={{fill: 'red', fontSize: 10}}
            stroke="#FF073A"
            axisLine={{stroke: '#FF073A'}}
          />
          <YAxis axisLine={{stroke: '#FF073A'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confirmedCases" stroke="#FF073A" />
        </LineChart>
        {/* </ResponsiveContainer> */}
      </div>
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={dataForCumulative}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-active-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="month"
            stroke="#007BFF"
            axisLine={{stroke: '#007BFF'}}
          />
          <YAxis axisLine={{stroke: '#007BFF'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activeCases" stroke="#007BFF" />
        </LineChart>
      </div>
      <div className="line-chart-wrapper">
        {/* </ResponsiveContainer> */}
        {/* <ResponsiveContainer width="85%" height={400}> */}
        <LineChart
          width={730}
          height={250}
          data={dataForCumulative}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-recovered-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="month"
            stroke="#27A243"
            axisLine={{stroke: '#27A243'}}
          />
          <YAxis axisLine={{stroke: '#27A243'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="recoveredCases" stroke="#27A243" />
        </LineChart>
      </div>
      {/* </ResponsiveContainer> */}
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={dataForCumulative}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-tested-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="month"
            stroke="#9673B9"
            axisLine={{stroke: '#9673B9'}}
          />
          <YAxis axisLine={{stroke: '#9673B9'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tested" stroke="#9673B9" />
        </LineChart>
      </div>
      {/* </ResponsiveContainer> */}
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={dataForCumulative}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-deceased-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="month"
            stroke="#6C757D"
            axisLine={{stroke: '#6C757D'}}
          />
          <YAxis axisLine={{stroke: '#6C757D'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="deceasedCases" stroke="#6C757D" />
        </LineChart>
      </div>
      {/* </ResponsiveContainer> */}
      {/* <ResponsiveContainer width="85%" height={400}> */}
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={dataForCumulative}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-vaccinated-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="month"
            stroke="#F95581"
            axisLine={{stroke: '#F95581'}}
          />
          <YAxis axisLine={{stroke: '#F95581'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="vaccinated" stroke="#F95581" />
        </LineChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  )

  onClickCumulative = () => {
    this.setState({activeOption: true})
  }

  onClickDaily = () => {
    this.setState({activeOption: false})
  }

  //  cumulative part
  getDataForCumulative = ([allDates, uniqueCumulativeDates]) => {
    const resultList = []
    const keyNames = Object.keys(allDates)
    keyNames.forEach(eachKey => {
      if (uniqueCumulativeDates.includes(eachKey)) {
        const {total} = allDates[eachKey]
        console.log(total)
        const month = format(new Date(eachKey), 'MMM Y').toString()
        const recoveredCases = total.recovered ? total.deceased : 0
        const confirmedCases = total.confirmed ? total.confirmed : 0
        const deceasedCases = total.deceased ? total.deceased : 0
        const activeCases = confirmedCases - (deceasedCases + recoveredCases)
        const tested = total.tested ? total.tested : 0
        const vaccinated = total.vaccinated1 ? total.vaccinated1 : 0

        resultList.push({
          month,
          confirmedCases,
          deceasedCases,
          recoveredCases,
          tested,
          vaccinated,
          activeCases,
        })
      }
    })
    return resultList
    // console.log(uniqueCumulativeDates)
  }

  renderTimeLineData = () => {
    const {activeOption} = this.state

    const activeTrend = activeOption ? 'active-class' : ''

    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const [dates] = singleTimeLineDataList

    const allDates = this.getAllDates(dates)

    const lastTenDaysCases = this.convertLastAllDatesObjectIntoAList(allDates)

    const lastDateOfMonths = this.getLastDateOfMonth(allDates)
    // console.log(`lastDateOfMonths`, lastDateOfMonths)
    const {uniqueCumulativeDates} = lastDateOfMonths

    const dataForCumulative = this.getDataForCumulative([
      allDates,
      uniqueCumulativeDates,
    ])

    console.log(`dataForCumulative`, dataForCumulative)

    return (
      <div>
        <div className="heading-container">
          <h1 className="trends-heading">Spread Trends</h1>
          <div>
            <button
              type="button"
              onClick={this.onClickCumulative}
              className={`action-button ${activeTrend}`}
            >
              Cumulative
            </button>
            <button
              type="button"
              onClick={this.onClickDaily}
              className={`action-button ${activeTrend}`}
            >
              Daily
            </button>
          </div>
        </div>
        <div className="chart-container">
          {activeOption
            ? this.renderLineChart(dataForCumulative)
            : this.renderBarChart(lastTenDaysCases)}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="timelinesDataLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const renderTimeLines = () => {
      const {apiStatus} = this.state

      switch (apiStatus) {
        case apiStatusConstants.success:
          return this.renderTimeLineData()
        case apiStatusConstants.inProgress:
          return this.renderLoadingView()
        default:
          return null
      }
    }
    return <div>{renderTimeLines()}</div>
  }
}
export default withRouter(TimeLineData)
