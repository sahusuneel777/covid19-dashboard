import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import StateWiseTotalRecord from '../StateWiseTotalRecord'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

// const arr = []
// const keys = Object.keys(fetchedData)

// for (let i = 0, n = keys.length; i < n; i += 1) {
//   const key = keys[i]
//   arr[key] = fetchedData[key]
// }

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    stateWiseDataList: [],
    totalList: [],
  }

  componentDidMount() {
    this.getAllStatesData()
  }

  getFormattedTotalData = eachTotal => ({
    confirmed: eachTotal.confirmed,
    deceased: eachTotal.deceased,
    recovered: eachTotal.recovered,
    tested: eachTotal.tested,
  })

  getAllStatesData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    // fetchedData.map(eachData => console.log(eachData))
    let totalData = []
    // totalData = this.getFormattedTotalData(fetchedData.AP.total)

    // totalData = this.getFormattedTotalData(fetchedData.AP.total)
    // this.getFormattedTotalData(`fetchedData.${eachState.state_code}.total`),
    // problems 1.applying map to fetchedData is not working
    // 2. defining string outside and applying it later also not working

    totalData = statesList.map(
      // stateCode= `${eachState.state_code}`
      eachState => fetchedData[`${eachState.state_code}`].total,
    )

    this.setState({stateWiseDataList: fetchedData, totalList: totalData})
  }

  getEachStateRecord = eachState => {
    // const {stateWiseDataList} = this.state
    const stateCode = eachState.state_code

    return (
      <div>
        <p>{`stateWiseDataList.${stateCode}`}</p>
      </div>
    )
  }

  render() {
    const {stateWiseDataList, totalList} = this.state
    console.log(stateWiseDataList)
    console.log(typeof stateWiseDataList)
    console.log(totalList)
    return (
      <div className="home-route-container">
        <Header />
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Enter the State"
          />
        </div>

        <ul className="state-wise-total-record">
          <li className="total-record-heading">
            <p className="table-heading">States/UT</p>
            <p className="table-heading">Confirmed</p>
            <p className="table-heading">Active</p>
            <p className="table-heading">Recovered</p>
            <p className="table-heading">Deceased</p>
            <p className="table-heading">Population</p>
          </li>
          <hr className="hr-line" />
          {totalList.map(eachTotal => (
            <StateWiseTotalRecord
              key={eachTotal.confirmed}
              stateTotal={eachTotal}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default Home
