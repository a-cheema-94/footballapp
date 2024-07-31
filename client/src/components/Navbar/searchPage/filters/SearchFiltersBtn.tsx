import { MdFilterList, MdOutlineFilterListOff } from "react-icons/md";
import TooltipWrapper from "../../../reusable/TooltipWrapper";
import { SearchActionType } from "../reducer/searchReducer";
import { Dispatch } from "react";


type Props = {
  openFilters: (dispatch: Dispatch<SearchActionType>) => void;
  closeFilters: (dispatch: Dispatch<SearchActionType>) => void;
  showFilters: boolean;
  dispatch: Dispatch<SearchActionType>
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
  return (
    <TooltipWrapper message="Search Filters" styleProps={styleProps}>
      <div>
        {!showFilters ? (
          <MdFilterList
            onClick={() => openFilters(dispatch)}
            className=""
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
        ) : (
          <MdOutlineFilterListOff
            onClick={() => closeFilters(dispatch)}
            className=""
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
        )}
      </div>
    </TooltipWrapper>
  );
};

export default SearchFiltersBtn;
