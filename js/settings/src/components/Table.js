import {useEffect } from 'react'
import { Icon, Pagination, Table, Confirm, Placeholder } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import {
  setFetchingSpoiler,
  fetchSpoilers,
  spoilerList,
  setShowConfirm,
  showConfirm,
  setSelectedSpoilerId,
  selectedSpoilerId,
  deleteSpoiler,
  fetchingSpoiler,
  spoilerDeleted,
  setModalActive,
  spoilerAdded,
  totalPages,
  activePage,
  setModalFormView,
  fetchSpoiler,
  setSpoilerToUpdateData
} from '../store/reducer/appSlice';

const ConfirmDelete = (props) => {
  
  const displayConfirm = useSelector(showConfirm);
  const id = useSelector(selectedSpoilerId);
  const dispatch = useDispatch();

  return <div>
    <Confirm
      content='Are you sure you want to delete?'
        open={displayConfirm}
        onCancel={() => dispatch(setShowConfirm(false))}
        onConfirm={()=> dispatch(deleteSpoiler(id))}
      />
  </div>
    
}

const LoadingTable = () => {
  return <>
  {
    Array.from([1,3,4]).map((d, i) => {
      return <Table.Row>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Table.Cell>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Table.Cell>
        </Table.Row>;
    })
  }
    
  </>
}

const TestTable = () => {

  const data = useSelector(spoilerList);
  const isFetching = useSelector(fetchingSpoiler);
  const isDeleted = useSelector(spoilerDeleted);
  const isAdded = useSelector(spoilerAdded);
  const pages = useSelector(totalPages);
  const activeP = useSelector(activePage);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(data.length === 0 || isDeleted === true || isAdded === true){
      dispatch(setFetchingSpoiler(true));
      dispatch(fetchSpoilers());
    }
  }, [isDeleted, isAdded]);
  
  return <>
    <ConfirmDelete/>
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
          isFetching ? <LoadingTable/> :
            Array.from(data).map((d, i) => {
              const {title, content} = d;

              return <Table.Row>
                <Table.Cell>{title.rendered}</Table.Cell>
                <Table.Cell><p dangerouslySetInnerHTML={{__html:content.rendered}}/></Table.Cell>
                <Table.Cell>
                  <a href="#" onClick={()=> { 
                    dispatch(setSpoilerToUpdateData([]));
                    dispatch(setModalActive(true));
                    dispatch(setModalFormView('update'));
                    dispatch(fetchSpoiler(d.id));
                    dispatch(setSelectedSpoilerId(d.id));
                  }}><Icon name="edit outline"/></a>
                  <a href="#" onClick={()=> {
                    dispatch(setShowConfirm(true)); 
                    dispatch(setSelectedSpoilerId(d.id));
                  }}><Icon name="delete"/></a>
                </Table.Cell>
              </Table.Row>;
            })
        }
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Pagination 
              firstItem={null}
              lastItem={null}
              activePage={activeP} 
              totalPages={pages} 
              floated="right" 
              onPageChange={(e, {activePage})=> {
                dispatch(fetchSpoilers(activePage))
              }}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </>
  
}

export default TestTable