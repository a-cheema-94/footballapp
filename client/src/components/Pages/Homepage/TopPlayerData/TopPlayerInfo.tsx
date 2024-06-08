
type Props = any

const TopPlayerInfo = ({ player }: Props) => {
  return (
    <div className="d-flex gap-2 ">
      <p>{player.general.name}</p>
      <div>{player.statistics.goals.total}</div>
    </div>
  )
}

export default TopPlayerInfo