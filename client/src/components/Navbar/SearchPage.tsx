import Button from 'react-bootstrap/Button';
import { IoMdClose } from "react-icons/io";


type Props = {
  search: boolean,
  close: () => void
}

{/* <Form className="d-flex">
  <Form.Control
    type="search"
    placeholder="Search"
    className="me-2"
    aria-label="Search"
  />
  <Button variant="outline-success">Search</Button>
</Form> */}

const SearchPage = ({ search, close }: Props) => {
  return (
    <div className={`bg-white w-100 d-flex justify-content-between position-fixed transition-component ${search ? 'active' : ''}`}>
      

      <Button onClick={() => close()}>
        <IoMdClose />
      </Button>
    </div>
  )
}

export default SearchPage