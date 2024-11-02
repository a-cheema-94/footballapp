import { MdFilterList, MdOutlineFilterListOff } from "react-icons/md";
import TooltipWrapper from "../../../reusable/TooltipWrapper";
import { SearchActionType } from "../reducer/searchReducer";
import { Dispatch, useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeProvider";

type Props = {
  openFilters: (
    dispatch: Dispatch<SearchActionType<"TOGGLE_SEARCH_FILTERS">>
  ) => void;
  closeFilters: (
    dispatch: Dispatch<
      SearchActionType<
        | "TOGGLE_SEARCH_FILTERS"
        | "FILTER_PLAYER_TEAM"
        | "FILTER_PLAYER_POSITION"
        | "FILTER_PLAYER_RANGE"
      >
    >
  ) => void;
  showFilters: boolean;
  dispatch: Dispatch<
    SearchActionType<
      | "TOGGLE_SEARCH_FILTERS"
      | "FILTER_PLAYER_TEAM"
      | "FILTER_PLAYER_POSITION"
      | "FILTER_PLAYER_RANGE"
    >
  >;
};

// Tooltip Props
const styleProps = {
  placement: "right-end",
  delay: {
    show: 1500,
    hide: 300,
  },
};

const SearchFiltersBtn = ({
  openFilters,
  showFilters,
  closeFilters,
  dispatch,
}: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      {!showFilters ? (
        <MdFilterList
          onClick={() => openFilters(dispatch)}
          className={`${theme === 'light' ? 'text-dark' : 'text-gray-200'}`}
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
      ) : (
        <MdOutlineFilterListOff
          onClick={() => closeFilters(dispatch)}
          className={`${theme === 'light' ? 'text-dark' : 'text-gray-200'}`}
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default SearchFiltersBtn;
