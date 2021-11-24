import {Component} from 'react'
import {withRouter} from 'react-router-dom'

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
  ResponsiveContainer,
} from 'recharts'

import './index.css'

// const format = require('date-fns/format')

class TimeLineData extends Component {
  state = {
    activeTrend: `cumulative`,
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const singleTimeLineResultList = []
    const {timeLineData, match} = this.props
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
        if (lastTenDates.length < 10) {
          lastTenDates.push(dateObject)
        }
      }
    })
    return lastTenDates.reverse()
  }

  renderBarChart = lastTenDaysCases => (
    <div className="graph-container">
      <h1 className="bar-graph-heading">Bar Chart</h1>

      <ResponsiveContainer width="85%" height={400} margin={10}>
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
      </ResponsiveContainer>

      <ResponsiveContainer width="85%" height={400} margin={10}>
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
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
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
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
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
      </ResponsiveContainer>
    </div>
  )

  renderLineChart = lastTenDaysCases => (
    <div className="graph-container" testid="lineChartsContainer">
      <ResponsiveContainer width="85%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          className="bar-confirmed-chart"
          Legend="confirmed"
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            label={{fill: 'red', fontSize: 10}}
            stroke="#FF073A"
            axisLine={{stroke: '#FF073A'}}
          />
          <YAxis axisLine={{stroke: '#FF073A'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confirmed" stroke="#FF073A" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-active-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            stroke="#007BFF"
            axisLine={{stroke: '#007BFF'}}
          />
          <YAxis axisLine={{stroke: '#007BFF'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="active" stroke="#007BFF" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-recovered-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            stroke="#27A243"
            axisLine={{stroke: '#27A243'}}
          />
          <YAxis axisLine={{stroke: '#27A243'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="recovered" stroke="#27A243" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-tested-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            stroke="#9673B9"
            axisLine={{stroke: '#9673B9'}}
          />
          <YAxis axisLine={{stroke: '#9673B9'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tested" stroke="#9673B9" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-deceased-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            stroke="#6C757D"
            axisLine={{stroke: '#6C757D'}}
          />
          <YAxis axisLine={{stroke: '#6C757D'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="85%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="bar-vaccinated-chart"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            stroke="#F95581"
            axisLine={{stroke: '#F95581'}}
          />
          <YAxis axisLine={{stroke: '#F95581'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="vaccinated" stroke="#F95581" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  onClickCumulative = () => {
    this.setState({activeOption: true})
  }

  onClickDaily = () => {
    this.setState({activeOption: false})
  }

  //   getLastDateOfMonth = allDates => {
  //     const lastDates = []
  //     const keyNames = Object.keys(allDates)
  //     console.log(keyNames)
  //     keyNames.forEach(eachKey => {
  //       const dateString = eachKey
  //       const date = Date.parse(dateString)
  //       const dateStamp = new Date(date)
  //       const lastDateOfMonth = new Date(
  //         dateStamp.getFullYear(),
  //         dateStamp.getMonth() + 1,
  //         0,
  //       )

  //       // const string = toString(lastDateOfMonth)
  //       console.log(lastDateOfMonth)

  //       if (!lastDates.includes(`${lastDateOfMonth}`)) {
  //         lastDates.push(lastDateOfMonth)
  //         // console.log(lastDates)
  //       }
  //     })
  //     return lastDates
  //   }

  render() {
    const {activeOption} = this.state

    // const districtHeadingActiveClass = () => {
    //   switch (activeTrend) {
    //     case activeTrendConstants.cumulative:
    //       return 'confirmed-head'
    //     case activeTrendConstants.daily:
    //       return ' recovered-head'
    //     default:
    //       return null
    //   }
    // }

    // const districtHeadingActive = districtHeadingActiveClass()

    const activeTrend = activeOption ? 'active-class' : ''
    // const activeOption = activeDailyOption ? 'active-class' : ''

    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const [dates] = singleTimeLineDataList

    const allDates = this.getAllDates(dates)
    console.log(`allDates`, allDates)

    const lastTenDaysCases = this.convertLastAllDatesObjectIntoAList(allDates)
    // console.log(lastTenDaysCases)

    // const lastDateOfMonths = this.getLastDateOfMonth(allDates)
    // console.log(lastDateOfMonths)
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
            ? this.renderLineChart(lastTenDaysCases)
            : this.renderBarChart(lastTenDaysCases)}
        </div>
      </div>
    )
  }
}

export default withRouter(TimeLineData)
