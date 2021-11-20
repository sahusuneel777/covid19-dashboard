import {Component, React} from 'react'
import {withRouter} from 'react-router-dom'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// const format = require('date-fns/format')

class TimeLineData extends Component {
  state = {
    activeDailyOption: false,
    activeCumulativeOption: false,
  }

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
      }
    })
    return sample
  }

  convertLastAllDatesObjectIntoAList = allDates => {
    const lastTenDatesRecovered = []
    const keyNames = Object.keys(allDates)
    const reversedKeyNames = keyNames.reverse()

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

        // console.log("The current month is " + monthNames[d.getMonth()]);
        const month = monthNames[new Date(eachKey).getUTCMonth() + 1]
        const date = new Date(eachKey).getUTCDate()

        dateObject.date = `${date} ${month}`

        dateObject.confirmed = confirmedCases
        dateObject.recovered = recoveredCases
        dateObject.deceased = deceasedCases
        dateObject.active = activeCases
        dateObject.tested = tested
        dateObject.vaccinated = vaccinated
        if (lastTenDatesRecovered.length < 10) {
          lastTenDatesRecovered.push(dateObject)
        }
      }
    })
    return lastTenDatesRecovered.reverse()
  }

  renderBarChart = lastTenDaysCases => (
    <div>
      <h1>Bar Chart</h1>
      <div>
        <BarChart
          width={500}
          height={350}
          stroke="#9A0E31"
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
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
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>

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
      </div>
    </div>
  )

  renderLineChart = lastTenDaysCases => (
    <div className="App">
      <LineChart
        width={730}
        height={250}
        data={lastTenDaysCases}
        className="bar-confirmed-chart"
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" stroke="#FF073A" axisLine={{stroke: '#FF073A'}} />
        <YAxis axisLine={{stroke: '#FF073A'}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="confirmed" stroke="#FF073A" />
      </LineChart>

      <LineChart
        width={730}
        height={250}
        data={lastTenDaysCases}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        className="bar-active-chart"
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" stroke="#007BFF" axisLine={{stroke: '#007BFF'}} />
        <YAxis axisLine={{stroke: '#007BFF'}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="active" stroke="#007BFF" />
      </LineChart>

      <LineChart
        width={730}
        height={250}
        data={lastTenDaysCases}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        className="bar-recovered-chart"
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" stroke="#27A243" axisLine={{stroke: '#27A243'}} />
        <YAxis axisLine={{stroke: '#27A243'}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="recovered" stroke="#27A243" />
      </LineChart>

      <LineChart
        width={730}
        height={250}
        data={lastTenDaysCases}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        className="bar-tested-chart"
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" stroke="#9673B9" axisLine={{stroke: '#9673B9'}} />
        <YAxis axisLine={{stroke: '#9673B9'}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="tested" stroke="#9673B9" />
      </LineChart>

      <LineChart
        width={730}
        height={250}
        data={lastTenDaysCases}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        className="bar-deceased-chart"
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" stroke="#6C757D" axisLine={{stroke: '#6C757D'}} />
        <YAxis axisLine={{stroke: '#6C757D'}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
      </LineChart>

      <LineChart
        width={730}
        height={250}
        data={lastTenDaysCases}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        className="bar-vaccinated-chart"
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" stroke="#F95581" axisLine={{stroke: '#F95581'}} />
        <YAxis axisLine={{stroke: '#F95581'}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="vaccinated" stroke="#F95581" />
      </LineChart>
    </div>
  )

  onClickCumulative = () => {
    this.setState({activeOption: true})
  }

  onClickDaily = () => {
    this.setState({activeOption: false})
  }

  render() {
    const {activeOption} = this.state
    const activeClass = activeOption ? 'active-class' : ''
    // const activeOption = activeDailyOption ? 'active-class' : ''

    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const [dates] = singleTimeLineDataList

    const allDates = this.getAllDates(dates)
    // console.log(allDates)

    const lastTenDaysCases = this.convertLastAllDatesObjectIntoAList(allDates)
    // console.log(lastTenDaysCases)

    return (
      <div>
        <div>
          <button
            type="button"
            onClick={this.onClickCumulative}
            className={`action-button ${activeClass}`}
          >
            Cumulative
          </button>
          <button
            type="button"
            onClick={this.onClickDaily}
            className={`action-button ${activeClass}`}
          >
            Daily
          </button>
        </div>
        <div className="chart-container">
          {activeOption
            ? this.renderLineChart(lastTenDaysCases)
            : this.renderBarChart(lastTenDaysCases)}
        </div>
      </div>
    )
  }
}

export default withRouter(TimeLineData)
