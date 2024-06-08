
type Props = any

const PlayerCard = ({ player }: Props) => {
  return (
    <div className="d-flex flex-column align-items-center border border-black" style={{ width: '125px' }}>
      <p>{player.name} ({player.age})</p>
      <p>{player.number}</p>
      <p>{player.position}</p>
      <p>{player.team}</p>
    </div>
  )
}

export default PlayerCard