// Write your code here
import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {item} = this.props
    const {avatarUrl, forksCount, issuesCount, starsCount, name} = item
    return (
      <li className="repo-card">
        <img src={avatarUrl} alt={name} className="avatar-img" />
        <h1 className="repo-heading">{name}</h1>
        <div className="count-container">
          <div className="git-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              className="repo-image"
              alt="stars"
            />
            <p className="text">{starsCount}</p>
          </div>
          <div className="git-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              className="repo-image"
            />
            <p className="text">{forksCount}</p>
          </div>
          <div className="git-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              className="repo-image"
            />
            <p className="text">{issuesCount}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default RepositoryItem
