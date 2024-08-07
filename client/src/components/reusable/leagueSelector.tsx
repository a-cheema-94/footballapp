import { Dropdown, Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../functions/logoFunction";
import { LEAGUES } from "../../../../shared/fixedData.ts";
import { Dispatch } from "react";
import TooltipWrapper from "./TooltipWrapper.tsx";
import { SearchActionType } from "../Navbar/searchPage/reducer/searchReducer.ts";

type Props = {
  selectLeague: (
    eventKey: string,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>
  ) => void;
  playerLeague: string;
  dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>;
};

const LeagueSelector = ({ selectLeague, playerLeague, dispatch }: Props) => {
  const leagues = Object.keys(LEAGUES);
  const leagueIds = Object.values(LEAGUES);

  const handleDropdownSelect = (index: number) => {
    selectLeague(leagues[index], dispatch);
  };

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
            src={getLogosAndImages("leagues", LEAGUES[playerLeague])}
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
            onClick={() => handleDropdownSelect(index)}
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

export default LeagueSelector;
