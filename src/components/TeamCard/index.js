import './index.css'

const TeamCard = props => {
  const {name, teamImageUrl} = props
  return (
    <div className="team-card">
      <img src={teamImageUrl} alt={name} className="team-image" />
      <h1 className="team-heading">{name}</h1>
    </div>
  )
}

export default TeamCard
