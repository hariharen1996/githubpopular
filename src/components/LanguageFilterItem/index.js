// Write your code here
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  render() {
    const {item, activeId, updateId} = this.props
    const {id, language} = item

    const filterRepos = () => {
      updateId(id)
    }

    const style = activeId === id ? 'change-style' : 'no-change-style'
    return (
      <li className="language-items">
        <button
          className={`language-btn ${style}`}
          type="button"
          onClick={filterRepos}
        >
          {language}
        </button>
      </li>
    )
  }
}

export default LanguageFilterItem
