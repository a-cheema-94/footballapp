import { Dropdown, Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../functions/logoFunction";
import { LEAGUES } from "../../../../shared/fixedData.ts";
import { Dispatch, useState } from "react";
import TooltipWrapper from "./TooltipWrapper.tsx";
import { SearchActionType } from "../Navbar/searchPage/reducer/searchReducer.ts";

type Props = {
  selectLeague?: (
    eventKey: string,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>
  ) => void;
  dispatch?: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>;
};

const LeagueSelectorTest = ({ selectLeague, dispatch }: Props) => {
  const leagues = Object.keys(LEAGUES);
  const leagueIds = Object.values(LEAGUES);

  const [selectedLeague, setSelectedLeague] = useState<string>('Premier League');

  const handleDropdownSelect = (league: string) => {
    if(selectLeague && dispatch) {
      selectLeague(league, dispatch)
    }
    setSelectedLeague(league)
  }

  // Tooltip Props
  const styleProps = {
    placement: "top-start",
    delay: {
      show: 1000,
      hide: 400,
    },
  };

  return (
    <Dropdown>
      <TooltipWrapper message="Select League" styleProps={styleProps}>
        <Dropdown.Toggle className="bg-transparent text-black border-0">
          <img
            src={getLogosAndImages("leagues", LEAGUES[selectedLeague])}
            alt=""
            width={40}
            height={40}
          />
        </Dropdown.Toggle>
      </TooltipWrapper>

      <Dropdown.Menu>
        {leagues.map((league, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleDropdownSelect(league)}
          >
            <Stack direction="horizontal" className="gap-2">
              <p>{league}</p>
              <img
                src={getLogosAndImages("leagues", leagueIds[index])}
                width={20}
              />
            </Stack>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LeagueSelectorTest;
