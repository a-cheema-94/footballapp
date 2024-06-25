import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from 'react-icons/io5';


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
    <div className={`w-100 d-flex justify-content-between z-3 position-fixed transition-component ${search ? 'active' : ''}`}>
      
      <Form className="d-flex">
          <Form.Control 
            type="search" 
            placeholder='search for players ...'
            aria-label='Search'
            className='border-end-0'
          />

          <div className="border border-2 border-start-0 rounded-2 p-1">
            <IoSearchOutline className=''/>
          </div>


      </Form>

      <Button onClick={() => close()}>
        <IoMdClose />
      </Button>
    </div>
  )
}

export default SearchPage