import {Component} from 'react'
import {Link} from 'react-dom'
import FaqItem from '../FaqItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {
    faqsData: [],
    faqsList: [],
  }

  componentDidMount() {
    this.getCovid19Faqs()
  }

  getCovid19Faqs = async () => {
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(faqUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({faqsData: fetchedData, faqsList: fetchedData.faq})
    }
  }

  render() {
    const {faqsData, faqsList} = this.state
    // console.log(faqsData)
    // console.log(faqsData.faq)
    return (
      // <Link to="/about">
      <>
        <Header />
        <div className="about-route-container">
          <h1 className="about-heading">About</h1>
          <p className="last-update">Last update on Monday, Nov 15th 2021.</p>
          <p className="about-description">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul className="faq-list" testid="aqsUnorderedList">
            {faqsList.map(eachFaq => (
              <FaqItem faqData={eachFaq} key={eachFaq.qno} />
            ))}
          </ul>
          <Footer />
        </div>
      </>
      // </Link>
    )
  }
}

export default About
