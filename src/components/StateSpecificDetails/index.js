import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CaseCardItem from '../CaseCardItem'
import DistrictItem from '../DistrictItem'
import TimeLineData from '../TimeLineData'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280842/mini-project/andaman_pf3mkz.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640283838/andhra_ehc5in.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280685/mini-project/arunachal_pradesh_sea0ja.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280746/mini-project/assam_y9gktb.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280776/mini-project/bihar_vumygx.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280778/mini-project/chandigarh_jtqpby.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    img_src:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280778/mini-project/chatisgarh_kamr1g.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280803/mini-project/dadra_nsnowb.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280803/mini-project/delhi_hplruz.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280805/mini-project/goa_wg0i67.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280806/mini-project/gujarat_vcm1zk.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280806/mini-project/haryana_iusp4j.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280804/mini-project/himachal_pradesh_ushar0.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640281085/mini-project/jamu_uuf65k.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280804/mini-project/jarkhand_ntyurk.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280804/mini-project/kannada_utk8d7.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280805/mini-project/kerala_uvd3ds.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640281085/mini-project/jamu_uuf65k.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280806/mini-project/lakshdeep_fpsjs2.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280842/mini-project/maharastra_vzbzmd.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280842/mini-project/madhyapradesh_e9amsj.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280842/mini-project/manipur_chw7vu.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280842/mini-project/meghalaya_c4n9gv.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280843/mini-project/mizoram_kzzawy.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280845/mini-project/nagland_di40cc.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280852/mini-project/orisha_xn86o9.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280849/mini-project/puducery_w7tu2g.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280846/mini-project/punjabb_bxvzeu.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280849/mini-project/Rajastan_y59yqg.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280849/mini-project/sikkim_lduwip.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280845/mini-project/tamilnadu_eaioa6.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280847/mini-project/telangana_hibqcr.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280847/mini-project/tripura_sosctv.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280848/mini-project/utarpradesh_e3korl.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280848/mini-project/uttarakhand_xwf1pd.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    img_url:
      'https://res.cloudinary.com/dnv6kesmt/image/upload/v1640280849/mini-project/westbengal_sfkfcy.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}
const activeCaseConstants = {
  confirm: 'confirmed',
  active: 'active',
  recovered: 'recovered',
  deceased: 'deceased',
}
class StateSpecificDetails extends Component {
  state = {
    showConfirmedCases: true,
    showActiveCases: false,
    showRecoveredCases: false,
    showDeceasedCases: false,
    activeCaseClass: activeCaseConstants.confirm,
    stateWiseData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'

    const options = {
      method: 'GET',
    }

    const response1 = await fetch(apiUrl, options)
    const fetchedStateWiseData = await response1.json()
    this.setState({
      apiStatus: apiStatusConstants.success,
      stateWiseData: fetchedStateWiseData,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const {location} = this.props
    const {state} = location
    console.log(`state`, state)
    const {stateWiseData} = this.state
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
    const resultDistrictList = []
    const districtKeyName = Object.keys(districts)
    districtKeyName.forEach(keyName => {
      if (districts[keyName]) {
        const {total} = districts[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

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

  renderStateSpecificData = () => {
    const {
      showConfirmedCases,
      showActiveCases,
      showRecoveredCases,
      showDeceasedCases,
      activeCaseClass,
      // singleState,
    } = this.state

    const {match} = this.props

    const {params} = match
    const stateCode = params

    const specificState = stateCode

    const specificStateCode = specificState.stateCode

    const TabelData = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const singleState = TabelData.filter(
      eachTotal => eachTotal.stateCode === specificStateCode,
    )

    console.log(`singleState`, singleState)

    const [oneState] = singleState

    const {tested, population} = oneState

    let lastUpdatedDate = oneState.lastUpdated
    lastUpdatedDate = new Date(lastUpdatedDate).toDateString()

    const nameOfState = statesList.filter(
      eachState => eachState.state_code === specificStateCode,
    )
    const [State] = nameOfState
    const StateName = State.state_name
    const stateImg = State.img_url

    const [singleSpecificState] = singleState
    // console.log(`s2`, singleSpecificState)
    const {districts} = singleSpecificState

    const districtDataList = this.convertDistrictObjectIntoList(districts)
    // console.log(districtDataList)

    const sortByCaseKey = (array, key) =>
      array.sort((a, b) => {
        const x = a[key]
        const y = b[key]
        return x > y ? -1 : 1
      })

    const sortedArray = sortByCaseKey(districtDataList, activeCaseClass)
    // console.log(`sorted_case_array`, sortedArray)

    const showConfirmed = () => {
      this.setState({
        showConfirmedCases: true,
        showActiveCases: false,
        showDeceasedCases: false,
        showRecoveredCases: false,
        activeCaseClass: activeCaseConstants.confirm,
      })
    }

    const showActive = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: true,
        showDeceasedCases: false,
        showRecoveredCases: false,
        activeCaseClass: activeCaseConstants.active,
      })
    }

    const showDeceased = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: false,
        showDeceasedCases: true,
        showRecoveredCases: false,
        activeCaseClass: activeCaseConstants.deceased,
      })
    }

    const showRecovered = () => {
      this.setState({
        showConfirmedCases: false,
        showActiveCases: false,
        showDeceasedCases: false,
        showRecoveredCases: true,
        activeCaseClass: activeCaseConstants.recovered,
      })
    }

    const districtHeadingActiveClass = () => {
      switch (activeCaseClass) {
        case activeCaseConstants.confirm:
          return 'confirmed-head'
        case activeCaseConstants.recovered:
          return ' recovered-head'
        case activeCaseConstants.active:
          return 'active-head'
        case activeCaseConstants.deceased:
          return 'deceased-head'
        default:
          return null
      }
    }

    const districtHeadingActive = districtHeadingActiveClass()

    return (
      <div className="state-specific-details-route">
        <div className="banner-card">
          <div className="state-details-container">
            <h1 className="state-name-card">{StateName}</h1>
            <p className="last-update">{`Last Updated on ${lastUpdatedDate}`}</p>
          </div>
          <div className="tested-count-container">
            <p className="tested-head">Tested</p>
            <p className="test-count">{tested}</p>
          </div>
        </div>

        <ul className="cases-types">
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

        <div className="map-container">
          <div className="districts-container">
            <h1 className={`districts-heading ${districtHeadingActive}`}>
              Top Districts
            </h1>

            <ul
              className="districts-data-list"
              testid="topDistrictsUnorderedList"
            >
              {districtDataList.map(eachState => (
                <DistrictItem
                  key={eachState.districtName}
                  districtDetails={eachState}
                  showActiveCases={showActiveCases}
                  showDeceasedCases={showDeceasedCases}
                  showRecoveredCases={showRecoveredCases}
                  showConfirmedCases={showConfirmedCases}
                />
              ))}
            </ul>
          </div>
          <div className="map-section">
            <img src={stateImg} alt="state" className="state-pic" />
            <div className="additional">
              <p className="ncp-head">NCP Report</p>
              <p className="ncp-count">Populaton</p>
              <p className="ncp-population">{population}</p>
            </div>
          </div>
        </div>

        <TimeLineData activeCaseClass={activeCaseClass} />
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="stateDetailsLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const renderStateSpecificRoute = () => {
      const {apiStatus} = this.state

      switch (apiStatus) {
        case apiStatusConstants.success:
          return this.renderStateSpecificData()
        case apiStatusConstants.inProgress:
          return this.renderLoadingView()
        default:
          return null
      }
    }
    return <div>{renderStateSpecificRoute()}</div>
  }
}

export default StateSpecificDetails
