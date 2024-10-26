import { Dispatch, Ref } from "react";
import { ListGroup } from "react-bootstrap";
import { SearchActionType } from "../reducer/searchReducer";
import { SquadMemberType } from "../../../../queries/types/queryTypes";
import { getLogosAndImages } from "../../../../functions/logoFunction";

type Props = {
  showAutoCompleteSuggestions: boolean;
  showFilters: boolean;
  autoCompleteRef: Ref<HTMLDivElement>;
  autoCompleteSuggestions: SquadMemberType[];
  handleClickListItems: (
    index: number,
    dispatch: Dispatch<
      SearchActionType<
        | "FILTER_PLAYER_LEAGUE"
        | "SET_SEARCH_QUERY"
        | "TOGGLE_AUTOCOMPLETE_MENU"
        | "SET_AUTO_COMPLETE_INDEX"
      >
    >,
    autoCompleteSuggestions: SquadMemberType[]
  ) => void;
  autoCompleteSuggestionIndex: number;
  dispatch: Dispatch<
    SearchActionType<
      | "FILTER_PLAYER_LEAGUE"
      | "SET_SEARCH_QUERY"
      | "TOGGLE_AUTOCOMPLETE_MENU"
      | "SET_AUTO_COMPLETE_INDEX"
    >
  >;
};

const AutoComplete = ({
  autoCompleteRef,
  autoCompleteSuggestionIndex,
  autoCompleteSuggestions,
  handleClickListItems,
  showAutoCompleteSuggestions,
  showFilters,
  dispatch,
}: Props) => {
  return (
    <div>
      {showAutoCompleteSuggestions && !showFilters && (
        <ListGroup
          ref={autoCompleteRef}
          className="position-absolute bg-white start-0 w-100 list-unstyled top-100 rounded z-3"
        >
          {autoCompleteSuggestions.map(
            (suggestion: SquadMemberType, index: number) => (
              <ListGroup.Item
                onClick={() =>
                  handleClickListItems(index, dispatch, autoCompleteSuggestions)
                }
                key={index}
                active={index === autoCompleteSuggestionIndex}
                className={`bg-hover-green-500 d-flex gap-3 align-items-center ${
                  index === autoCompleteSuggestionIndex ? "bg-green-500" : ""
                }`}
              >
                <img src={getLogosAndImages("players", suggestion.id)} style={{ width: '3rem' }}/>
                <p>{suggestion.name}</p>
                


              </ListGroup.Item>
            )
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default AutoComplete;
