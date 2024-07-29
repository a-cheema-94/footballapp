import { MdFilterList, MdOutlineFilterListOff } from "react-icons/md"
import TooltipWrapper from "../../reusable/TooltipWrapper";
import { DiVisualstudio } from "react-icons/di";

type Props = {
  openFilters: () => void;
  closeFilters: () => void;
  showFilters: boolean
}

  // Tooltip Props
  const styleProps = {
    placement: "right-end",
    delay: {
      show: 1500,
      hide: 300
    }
  }

const SearchFiltersBtn = ({ openFilters, showFilters, closeFilters }: Props) => {
  return (
    <TooltipWrapper message="Search Filters" styleProps={styleProps}>
      <div>
        {!showFilters ? <MdFilterList onClick={openFilters} className="" style={{ width: '30px', height: '30px', cursor: 'pointer' }}/> : 
          <MdOutlineFilterListOff onClick={closeFilters} className="" style={{ width: '30px', height: '30px', cursor: 'pointer' }}/>
        }  
      </div>
    </TooltipWrapper>
  )
}

export default SearchFiltersBtn