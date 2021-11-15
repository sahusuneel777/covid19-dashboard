import {Component} from 'react'
import {Link} from 'react-dom'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateWiseTotalRecord from '../StateWiseTotalRecord'
import CaseCardItem from '../CaseCardItem'
import SearchRecommendation from '../SearchRecommendation'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

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
    stateWiseData: {},
    showStateStats: true,
    showSearchSuggestions: false,
    searchInput: '',
  }

  componentDidMount() {
    this.getAllStatesData()
  }

  getAllStatesData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({stateWiseData: fetchedData})
    }
  }

  onchangeSearchInput = event => {
    this.setState({
      showSearchSuggestions: true,
      searchInput: event.target.value,
      showStateStats: false,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {stateWiseData} = this.state

    // getting keys of an object object
    const keyNames = Object.keys(stateWiseData)

    keyNames.forEach(keyName => {
      // console.log(stateWiseData[keyName])
      if (stateWiseData[keyName]) {
        const {total} = stateWiseData[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = stateWiseData[keyName].meta.population
          ? stateWiseData[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          // name: statesList.find(state => state.state_code === keyName),
          name: statesList.find(state => state.state_code === keyName),
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  render() {
    const TabelData = this.convertObjectsDataIntoListItemsUsingForInMethod()
    const {
      searchInput,
      stateWiseData,
      showSearchSuggestions,
      showStateStats,
    } = this.state
    console.log(stateWiseData)
    let filteredStatesList = []
    filteredStatesList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const getUpdatedFilteredStates = state => ({
      stateCode: state.state_code,
      stateName: state.state_name,
    })

    const updatedFilteredStates = filteredStatesList.map(eachState =>
      getUpdatedFilteredStates(eachState),
    )

    return (
      <>
        <Header />
        <div className="home-route-container">
          <div className="search-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Enter the State"
              onChange={this.onchangeSearchInput}
            />
          </div>
          {showSearchSuggestions && (
            <ul className="search-recommendation-list">
              {updatedFilteredStates.map(eachState => (
                <SearchRecommendation
                  key={eachState.state_code}
                  state={eachState}
                />
              ))}
            </ul>
          )}

          {showStateStats && (
            <div className="stats-section">
              <div className="diff-type-cards">
                {TabelData.map(
                  eachTotal =>
                    eachTotal.name === undefined && (
                      <CaseCardItem
                        key={eachTotal.confirmed}
                        stateTotal={eachTotal}
                      />
                    ),
                )}
              </div>

              <ul
                className="state-wise-total-table-record"
                testid="stateWiseCovidDataTable"
              >
                <li className="total-record-heading">
                  <div className="sorting-item">
                    <p className="table-heading">States/UT</p>
                    <button
                      type="button"
                      className="sort-icon"
                      testid="ascendingSort"
                    >
                      <FcGenericSortingAsc />
                    </button>
                    <button
                      type="button"
                      className="sort-icon"
                      testid="descendingSort"
                    >
                      <FcGenericSortingDesc />
                    </button>
                  </div>
                  <p className="table-heading">Confirmed</p>
                  <p className="table-heading">Active</p>
                  <p className="table-heading">Recovered</p>
                  <p className="table-heading">Deceased</p>
                  <p className="table-heading">Population</p>
                </li>
                <hr className="hr-line" />
                {TabelData.map(
                  eachTotal =>
                    eachTotal.name !== undefined && (
                      <StateWiseTotalRecord
                        key={eachTotal.confirmed}
                        stateTotal={eachTotal}
                      />
                    ),
                )}
              </ul>
            </div>
          )}
          <Footer />
        </div>
      </>
      // </Link>
    )
  }
}

export default Home
