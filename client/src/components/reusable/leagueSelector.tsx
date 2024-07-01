import { Dropdown, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { getLogosAndImages } from "../../functions/logoFunction"
import { LEAGUES } from '../../../../shared/fixedData.ts'
import { useState } from "react"

type Props = {
  selectLeague: (event: any) => void,
  playerLeague: string
}

const LeagueSelector = ({ selectLeague, playerLeague }: Props) => {

  const [imageIndex, setImageIndex] = useState<number>(0)

  const renderTooltip = (props: any) => (
    <Tooltip {...props} placement="top-start">
      Select League
    </Tooltip>
  )

  // <OverlayTrigger
  //   
  // ></OverLayTrigger>

  // "Premier League": 39,
  // "Bundesliga": 78,
  // "Serie A": 135,
  // "La Liga": 140

  // getLogosAndImages('leagues', 39)

  const leagues = Object.keys(LEAGUES);
  const leagueIds = Object.values(LEAGUES);

  const test = Object.entries(LEAGUES)
  
  const handleDropdownSelect = (index: number) => {
    setImageIndex(index);
    selectLeague(leagues[index])
  }
  

  return (
    <Stack direction="horizontal" className="gap-2">
      <Dropdown>
        <OverlayTrigger
          placement="top-start"
          delay={{ show: 1000, hide: 400 }}
          overlay={renderTooltip}
        >
          <Dropdown.Toggle />
        </OverlayTrigger>

        <Dropdown.Menu>
          {leagues.map((league, index) => (
            <Dropdown.Item key={index} onClick={() => handleDropdownSelect(index)}>
              <Stack direction="horizontal" className="gap-2">
                <p>{league}</p>
                <img src={getLogosAndImages('leagues', leagueIds[index])} width={20} />
              </Stack>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <img src={getLogosAndImages('leagues', LEAGUES[playerLeague])} alt="" width={40} height={40}/>
    </Stack>
  )
}

export default LeagueSelector