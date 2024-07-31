import { Dispatch, Ref } from "react";
import { ListGroup } from "react-bootstrap";
import { SearchActionType } from "../reducer/searchReducer";

type Props = {
  showAutoCompleteSuggestions: boolean;
  showFilters: boolean;
  autoCompleteRef: Ref<HTMLDivElement>;
  autoCompleteSuggestions: any[];
  handleClickListItems: (index: number, dispatch: Dispatch<SearchActionType>, autoCompleteSuggestions: any[]) => void;
  autoCompleteSuggestionIndex: number;
  dispatch: Dispatch<SearchActionType>
};

const AutoComplete = ({
  autoCompleteRef,
  autoCompleteSuggestionIndex,
  autoCompleteSuggestions,
  handleClickListItems,
  showAutoCompleteSuggestions,
  showFilters,
  dispatch
}: Props) => {
  return (
    <div>
      {showAutoCompleteSuggestions && !showFilters && (
        <ListGroup
          ref={autoCompleteRef}
          className="position-absolute bg-white start-0 w-100 list-unstyled top-100 rounded"
        >
          {autoCompleteSuggestions.map((suggestion: any, index: number) => (
            <ListGroup.Item
              onClick={() => handleClickListItems(index, dispatch, autoCompleteSuggestions)}
              key={index}
              active={index === autoCompleteSuggestionIndex}
              className={`bg-hover-green-500 ${
                index === autoCompleteSuggestionIndex ? "bg-green-500" : ""
              }`}
            >
              {suggestion.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default AutoComplete;
