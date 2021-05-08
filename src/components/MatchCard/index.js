import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="opponent-logo"
      />
      <h1>{competingTeam}</h1>
      <p>{result}</p>
      <h1 className={matchStatus === 'Won' ? 'won' : 'lost'}>{matchStatus}</h1>
    </li>
  )
}

export default MatchCard
