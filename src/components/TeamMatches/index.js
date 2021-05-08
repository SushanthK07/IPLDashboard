import React from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends React.Component {
  state = {
    teamInfo: {},
    isLoading: true,
  }

  componentDidMount() {
    this.fetchTeamDetails()
  }

  fetchTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const teamInfo = {
      latestMatchDetails: {
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        id: data.latest_match_details.id,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },

      recentMatches: data.recent_matches.map(matchInfo => ({
        competingTeam: matchInfo.competing_team,
        competingTeamLogo: matchInfo.competing_team_logo,
        date: matchInfo.date,
        firstInnings: matchInfo.first_innings,
        id: matchInfo.id,
        manOfTheMatch: matchInfo.man_of_the_match,
        matchStatus: matchInfo.match_status,
        result: matchInfo.result,
        secondInnings: matchInfo.second_innings,
        umpires: matchInfo.umpires,
        venue: matchInfo.venue,
      })),
      teamBannerUrl: data.team_banner_url,
    }
    this.setState({teamInfo, isLoading: false})
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {isLoading, teamInfo} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamInfo

    console.log(teamInfo)
    return isLoading ? (
      <div className={`team-matches ${id}`} testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className={`team-matches ${id}`}>
        <img src={teamBannerUrl} className="banner" alt={id} />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="match-cards-list">
          {recentMatches.map(eachMatchInfo => (
            <MatchCard key={eachMatchInfo.id} matchDetails={eachMatchInfo} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
