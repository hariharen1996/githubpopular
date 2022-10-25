import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem/index'
import RepositoryItem from '../RepositoryItem/index'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const constantTypes = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    data: [],
    apiStatus: constantTypes.initial,
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepo()
  }

  getRepo = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: constantTypes.loading})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(item => ({
        id: item.id,
        avatarUrl: item.avatar_url,
        forksCount: item.forks_count,
        issuesCount: item.issues_count,
        starsCount: item.stars_count,
        name: item.name,
      }))
      this.setState({data: updatedData, apiStatus: constantTypes.success})
    } else if (response.status === 401) {
      this.setState({apiStatus: constantTypes.failure})
    }
  }

  updateId = activeId => {
    this.setState({activeId}, this.getRepo)
  }

  render() {
    const {data, apiStatus, activeId} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case constantTypes.success:
        return (
          <div className="bg-container">
            <h1 className="heading">Popular</h1>
            <ul className="language-container">
              {languageFiltersData.map(item => (
                <LanguageFilterItem
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  updateId={this.updateId}
                />
              ))}
            </ul>

            <ul className="repo-container">
              {data.map(item => (
                <RepositoryItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        )
      case constantTypes.loading:
        return (
          // eslint-disable-next-line react/no-unknown-property
          <div className="loading-container" testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case constantTypes.failure:
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
              alt="failure view"
              className="failure-img"
            />
            <h1 className="failure-text">Something Went Wrong</h1>
          </div>
        )
      default:
        return null
    }
  }
}

export default GithubPopularRepos
