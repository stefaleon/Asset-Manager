import { useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const AssetForm = ({ create, categories, locations }) => {
  const [asset, setAsset] = useState({
    name: '',
    description: '',
    category: '5f8e782efd960400178547c8', // hardcode a category id for assets with unassigned category
    location: '5fa027494b79a300171969a9', // hardcode a location id for assets with unassigned location
  });

  const onChange = (e) => {
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById('editing').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
  };

  return (
    <>
      {create && (
        <div id='editing'>
          <Alert variant='primary'>Create Asset</Alert>
        </div>
      )}
      <div id='submitted' className='hidden'>
        <Alert variant='success'>Data Submitted</Alert>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={asset.name}
            placeholder='Asset Name'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={asset.description}
            placeholder='Asset Description'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as='select'
            name='category'
            value={asset.category}
            onChange={onChange}
          >
            {categories?.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            as='select'
            name='location'
            value={asset.location}
            onChange={onChange}
          >
            {locations?.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Button as='input' type='submit' value='Submit' />
        </Form.Group>
      </Form>
    </>
  );
};

export default AssetForm;
