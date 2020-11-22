import { useState } from 'react';
import { Form, InputGroup, Jumbotron, Button } from 'react-bootstrap';

const Search = ({ searchTerm }) => {
  const [search, setSearch] = useState({ term: searchTerm });

  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <Jumbotron>
      <Form inline>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <i className='fas fa-search'></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id='search-input'
            type='text'
            name='term'
            value={search.term}
            placeholder='Search for...'
            onChange={onChange}
            className='mr-sm-2'
          />
        </InputGroup>
        <Button variant='outline-success' type='submit' id='search-button'>
          Search
        </Button>
      </Form>
    </Jumbotron>
  );
};

export default Search;
