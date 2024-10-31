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
  resetFilters?: (
    dispatch: React.Dispatch<
      SearchActionType<
        "FILTER_PLAYER_TEAM" | "FILTER_PLAYER_POSITION" | "FILTER_PLAYER_RANGE"
      >
    >
  ) => void;
  selectLeague?: (
    eventKey: string,
    dispatch: Dispatch<SearchActionType<"FILTER_PLAYER_LEAGUE">>
  ) => void;
  dispatch?: Dispatch<
    SearchActionType<
      | "FILTER_PLAYER_LEAGUE"
      | "FILTER_PLAYER_TEAM"
      | "FILTER_PLAYER_POSITION"
      | "FILTER_PLAYER_RANGE"
    >
  >;
  league: string;
};

const LeagueSelector = ({
  selectLeague,
  dispatch,
  setPlayerLeague,
  league,
  resetFilters,
}: Props) => {
  const leagues = Object.keys(LEAGUES) as LeagueNames[];
  const leagueIds = Object.values(LEAGUES);

  const handleDropdownSelect = (league: LeagueNames) => {
    setTimeout(() => {
      if (selectLeague && dispatch && resetFilters) {
        resetFilters(dispatch);
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
        <Dropdown.Toggle className="bg-teal-300 text-black border-0">
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
