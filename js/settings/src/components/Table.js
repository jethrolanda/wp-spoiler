import {useEffect, useState} from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';

const tableRows = (d) => {
  const {title, content} = d;

  return <Table.Row>
    <Table.Cell>{title.rendered}</Table.Cell>
    <Table.Cell><p dangerouslySetInnerHTML={{__html:content.rendered}}/></Table.Cell>
    <Table.Cell>
      <a href="#"><Icon name="edit outline"/></a>
      <a href="#"><Icon name="delete"/></a>
    </Table.Cell>
  </Table.Row>;
}


const TestTable = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${wps_settings_i18n.rest_url}wp/v2/spoiler`)
    .then((response) => {
      setData(response.data);
    });
  }, []);

  return <>
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { 
          Array.from(data).map((d, i) => {
            return tableRows(d);
          })
        }
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='chevron left' />
              </Menu.Item>
              <Menu.Item as='a'>1</Menu.Item>
              <Menu.Item as='a'>2</Menu.Item>
              <Menu.Item as='a'>3</Menu.Item>
              <Menu.Item as='a'>4</Menu.Item>
              <Menu.Item as='a' icon>
                <Icon name='chevron right' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </>
  
}

export default TestTable