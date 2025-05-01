import { Container, Table } from "react-bootstrap"
import { TeamStandingType } from "../../../queries/types/queryTypes"
import LogoOrPlayerImage from "../../reusable/LogoOrPlayerImage"
import FormGraphic from "./FormGraphic"

type Props = {
  leagueTable: TeamStandingType[]
}

const CompetitionTable = ({ leagueTable }: Props) => {
  return (
    <div>
      {(leagueTable) ? (
        <Container fluid>
        <Table responsive="md" striped hover className="border rounded mw-100 mx-auto league-table">
          <thead>
            <tr>
              <th colSpan={2}>Club</th>
              <th>Pld</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
              <th>Last 5</th>
            </tr>
          </thead>
          <tbody>
            {(leagueTable).map((team: TeamStandingType, index: number) => (
              <tr className={`${team.isChampion ? 'champion' : team.isRelegated ? 'relegated' : ''}`} key={index}>
                <td>{team.isChampion ? 'C' : team.isRelegated ? 'R' : team.rank}</td>
                <td className="d-flex gap-3">
                  <LogoOrPlayerImage
                    category="teams"
                    dimension="20px"
                    id={team.team.id}
                  />

                  {team.team.name}
                </td>
                <td>{team.all.played}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{team.all.goals.for}</td>
                <td>{team.all.goals.against}</td>
                <td>{team.goalsDiff}</td>
                <td>{team.points}</td>
                <td>
                  <FormGraphic form={team.form} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Container>
      ) : (
        <div>data unavailable for now</div>
      )}
    </div>
  )
}

export default CompetitionTable