import {Component} from 'react'
import {useLocation} from 'react-router-dom'
import CaseCardItem from '../CaseCardItem'
import DistrictItem from '../DistrictItem'
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

class StateSpecificDetails extends Component {
  state = {
    showConfirmedCases: true,
    showActiveCases: false,
    showRecoveredCases: false,
    showDeceasedCases: false,
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const {location} = this.props
    const {state} = location
    const {stateWiseData} = state
    const resultList = []

    // getting keys of an object object
    const stateKeyNames = Object.keys(stateWiseData)

    stateKeyNames.forEach(keyName => {
      if (stateWiseData[keyName]) {
        const {total} = stateWiseData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = stateWiseData[keyName].meta.population
          ? stateWiseData[keyName].meta.population
          : 0
        const lastUpdated = stateWiseData[keyName].meta.last_updated
          ? stateWiseData[keyName].meta.last_updated
          : 'No Report'

        let allDistricts = []
        allDistricts = stateWiseData[keyName].districts
        resultList.push({
          stateCode: keyName,
          name: statesList.find(eachState => eachState.state_code === keyName),
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
          lastUpdated,
          districts: allDistricts,
        })
      }
    })
    return resultList
  }

  convertDistrictObjectIntoList = districts => {
    console.log('finish called')
    const resultDistrictList = []
    const districtKeyName = Object.keys(districts)
    districtKeyName.forEach(keyName => {
      if (districts[keyName]) {
        const {total} = districts[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        // const population = districts[keyName].meta.population
        //   ? districts[keyName].meta.population
        //   : 0
        resultDistrictList.push({
          districtName: keyName,
          confirmed,
          recovered,
          deceased,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultDistrictList
  }

  render() {
    const {
      showConfirmedCases,
      showActiveCases,
      showRecoveredCases,
      showDeceasedCases,
    } = this.state
    const {match, location} = this.props
    console.log(match)
    const {params} = match
    console.log(location)
    const stateCode = params
    const specificState = stateCode
    const {state} = location
    const {stateWiseData} = state
    console.log(stateWiseData)
    const specificStateCode = specificState.stateCode

    const TabelData = this.convertObjectsDataIntoListItemsUsingForInMethod()
    const singleState = TabelData.filter(
      eachTotal => eachTotal.stateCode === specificStateCode,
    )

    const [singleSpecificState] = singleState
    const {districts} = singleSpecificState

    const districtDataList = this.convertDistrictObjectIntoList(districts)
    console.log(districtDataList)

    // const singleState = getSingleStateData()

    const showConfirmed = () => {
      this.setState({
        showConfirmedCases: true,
        showActiveCases: false,
        showDeceasedCases: false,
        showRecoveredCases: false,
      })
    }

    const showActive = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: true,
        showDeceasedCases: false,
        showRecoveredCases: false,
      })
    }

    const showDeceased = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: false,
        showDeceasedCases: true,
        showRecoveredCases: false,
      })
    }

    const showRecovered = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: false,
        showDeceasedCases: false,
        showRecoveredCases: true,
      })
    }

    return (
      <div className="state-specific-details-route">
        <div className="state-name-container">state</div>
        <div className="tested-count-container">
          <p>Tested</p>
          <p>{}</p>
        </div>

        <ul>
          {singleState.map(eachState => (
            <CaseCardItem
              key={eachState.stateCode}
              showConfirmed={showConfirmed}
              showActive={showActive}
              showRecovered={showRecovered}
              showDeceased={showDeceased}
              stateTotal={eachState}
              showActiveCases={showActiveCases}
              showDeceasedCases={showDeceasedCases}
              showRecoveredCases={showRecoveredCases}
              showConfirmedCases={showConfirmedCases}
            />
          ))}
        </ul>

        <h1 className="districts-heading">Top Districts</h1>

        <ul className="districts-data-list">
          {districtDataList.map(eachState => (
            <DistrictItem
              //  key={eachState.district.stateCode}
              districtDetails={eachState}
              showActiveCases={showActiveCases}
              showDeceasedCases={showDeceasedCases}
              showRecoveredCases={showRecoveredCases}
              showConfirmedCases={showConfirmedCases}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default StateSpecificDetails
