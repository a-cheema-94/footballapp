import { useQuery } from "@apollo/client"
import { LAST_FIXTURE_INFO_QUERY } from "../../../../queries/fixtures/lastFixtureInfoQuery"
import { FixtureLineupType, FixtureType, PlayerFixtureType } from "../../../../queries/types/queryTypes"

type Props = {}

const FullTimeMatchStats = (props: Props) => {
  const {data, loading, error} = useQuery(LAST_FIXTURE_INFO_QUERY, { variables: {
    team: 'Liverpool',
    league: 'Premier League'
  } })

  if(error) return <div>An Error occurred: {error.message}</div>
  if(loading) return <p>Loading ...</p>


  const { events, fixture, goals, league, lineups } = data.getLastFixtureInfo;
  const [ homeTeamLineup, awayTeamLineup ] = lineups;

  return (
    <div>

      <div className="">

        <p>{fixture.referee}</p>
        <p>{fixture.status.short}</p>
        <p>{goals.home} - {goals.away}</p>
      </div>

      <div className="lineups d-flex gap-4">
        <div className="homeTeam">
          <p>{homeTeamLineup.coach.name}</p>
          {homeTeamLineup.startXI.map((player: PlayerFixtureType, index: number) => (
            <p key={index}>{player.player.name}</p>
          ))}
        </div>
        <div className="awayTeam">
          <p>{awayTeamLineup.coach.name}</p>
          {awayTeamLineup.startXI.map((player: PlayerFixtureType, index: number) => (
            <p key={index}>{player.player.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FullTimeMatchStats