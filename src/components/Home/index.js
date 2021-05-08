import React from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'
import TeamCard from '../TeamCard'

class Home extends React.Component {
  state = {
    teams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchTeamDetails()
  }

  fetchTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teams = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({teams, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    console.log(teams, isLoading)
    return isLoading ? (
      <div className="home" testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="home">
        <div className="wrapper">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl-logo"
            className="ipl-logo"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        <ul className="teams-container">
          {teams.map(team => {
            const {id, name, teamImageUrl} = team
            return (
              <li key={id} className="team-container">
                <Link to={`/team-matches/${id}`} className="team-link">
                  <TeamCard name={name} teamImageUrl={teamImageUrl} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Home
