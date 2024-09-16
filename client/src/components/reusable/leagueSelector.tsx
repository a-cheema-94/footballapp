import { Dropdown, Spinner, Stack } from "react-bootstrap";
import { getLogosAndImages } from "../../functions/logoFunction";
import { LEAGUES } from "../../../../shared/fixedData.ts";
import { Dispatch, useState } from "react";
import TooltipWrapper from "./TooltipWrapper.tsx";
import { SearchActionType } from "../Navbar/searchPage/reducer/searchReducer.ts";
import { LeagueNames } from "../../functions/fixedData.ts";
import { StringIterator } from "lodash";

type Props = {
  setPlayerLeague?: (league: LeagueNames) => void;
  selectLeague?: (
    eventKey: string,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>
  ) => void;
  dispatch?: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>;
  league: string;
};

const LeagueSelector = ({ selectLeague, dispatch, setPlayerLeague, league }: Props) => {
  const leagues = Object.keys(LEAGUES) as LeagueNames[];
  const leagueIds = Object.values(LEAGUES);


  const handleDropdownSelect = (league: LeagueNames) => {
    setTimeout(() => {
      if (selectLeague && dispatch) {
        selectLeague(league, dispatch);
      }
      if (setPlayerLeague) {
        setPlayerLeague(league);
      }
    }, 500);
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
            src={getLogosAndImages("leagues", LEAGUES[league])}
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

export default LeagueSelector;
