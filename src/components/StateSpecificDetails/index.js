import {Component} from 'react'
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
  state = {allStatesData: [], specificState: ''}

  componentDidMount() {
    this.getStateSpecificDetails()
  }

  getStateSpecificDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    this.setState({specificState: stateCode})
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

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const totalDistrictsDataList = []
    const {allStatesData} = this.state
    // console.log(allStatesData)

    const getAllDistrictsTotalData = allDistricts => {
      const districtKeyNames = Object.keys(allDistricts)

      districtKeyNames.forEach(keyName => {
        // let confirmed
        if (allDistricts[keyName]) {
          const {total} = allDistricts[keyName]
          console.log(total)

          //   const confirmed = total.confirmed ? total.confirmed : 'No Report'

          //   const deceased =
          //     total.deceased !== undefined ? total.deceased : 'No Report'
          //   const recovered =
          //     total.recovered !== undefined ? total.recovered : 'No Report'
          //   const tested = total.tested !== undefined ? total.tested : 'No Report'

          //   totalDistrictsDataList.push({
          //     confirmed,
          //     deceased,
          //     recovered,
          //     tested,
          //   })
        }
      })
      return 0

      // return totalDistrictsDataList
    }

    // getting keys of an object object
    const stateKeyNames = Object.keys(allStatesData)

    stateKeyNames.forEach(keyName => {
      // console.log(allStatesData[keyName])
      if (allStatesData[keyName]) {
        const {total, districts} = allStatesData[keyName]
        // console.log(districts)
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = allStatesData[keyName].meta.population
          ? allStatesData[keyName].meta.population
          : 0
        const lastUpdated = allStatesData[keyName].meta.last_updated
          ? allStatesData[keyName].meta.last_updated
          : 'No Report'

        // const specificDistrict = getAllDistrictsTotalData(districts)

        // const specificDistrict = districts.map(eachDistrict =>
        //   this.getAllDistrictsTotalData(eachDistrict),
        // )

        // console.log(specificDistrict)
        // const districts = getAllDistrictsTotalData(specificDistrict)

        let allDistricts = []
        allDistricts = allStatesData[keyName].districts
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
          lastUpdated,
          districts: allDistricts,
        })
      }
    })
    return resultList
  }

  render() {
    const {specificState} = this.state
    const TabelData = this.convertObjectsDataIntoListItemsUsingForInMethod()
    const state = TabelData.filter(
      eachTotal => eachTotal.stateCode === specificState,
    )
    const [particularState] = state
    // const [a] = particularState
    console.log(particularState)
    // const {districts} = particularState
    // console.log(particularState.districts)

    return (
      <div className="state-specific-details-route">
        <div className="state-name-container">state</div>
        <div className="tested-count-container">
          <p>Tested</p>
          <p>{}</p>
        </div>

        <ul>
          {state.map(eachState => (
            <CaseCardItem key={eachState.stateCode} stateTotal={eachState} />
          ))}
        </ul>

        {/* <ul>
          {particularState.districts.forEach(eachState => (
            <DistrictItem
              // key={eachState.district.stateCode}
              districtDetails={eachState}
            />
          ))}
        </ul> */}
      </div>
    )
  }
}

export default StateSpecificDetails

/* konni Districts ki  confirmed levu ,need to edit this. */

// const districtsData = TabelData.map(eachData => {
//   if (eachData) {
//     return eachData.districts
//   }
//   return null
// })
// console.log(districtsData)

// {
//   /* <ul>
//           {districtsData.map(eachDistrict => (
//             <div>
//               <p>{eachDistrict[0].total.confirmed}</p>
//             </div>
//           ))}
//         </ul>  */
// }
