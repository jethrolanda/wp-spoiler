import { useState } from 'react'
import { Button, Modal, Form as SemanticForm, Message, Icon } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { useSelector, useDispatch } from 'react-redux';
import {
  setModalActive,
  modalActive,
  modalFormView,
  createSpoiler,
  updateSpoiler,
  setModalFormView,
  spoilerToUpdateData,
  selectedSpoilerId,
  fetchingSpoiler
} from '../store/reducer/appSlice';

const required = value => (value ? undefined : 'Required')

const FormStatus = (props) => {
  const { status } = props;
  const modalView = useSelector(modalFormView);

  return status !== false ? (
    <>
      { status === 'success' ? <Message positive>
        <Message.Header>{`Successfully ${modalView == 'add' ? 'created!' : 'updated!'}` }</Message.Header>
      </Message> : <Message negative>
        <Message.Header>{`Error ${modalView == 'add' ? 'adding!' : 'updating!'}`}</Message.Header>
      </Message>}
      
    </>) : <></>
}

const AddSpoiler = () => {
  
  const [ status, setStatus ] = useState(false);
  const isModalActive = useSelector(modalActive);
  const modalView = useSelector(modalFormView);
  const data = useSelector(spoilerToUpdateData);
  const spoilerId = useSelector(selectedSpoilerId);
  const isFetching = useSelector(fetchingSpoiler);
  const dispatch = useDispatch();

  return <>
    <Modal
        onClose={() => {dispatch(setModalActive(false)); setStatus(false); }}
        onOpen={() => dispatch(setModalActive(true))}
        open={isModalActive}
        trigger={<Button primary onClick={()=>dispatch(setModalFormView('add'))}>Add Spoiler</Button>}
      >
        <Modal.Header>
        {
          modalView === 'add' ? <><Icon name='add' />Add Spoiler</> : <><Icon name='edit outline' />Update Spoiler</>
        }
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <FormStatus status={status}/>
            <Form
              initialValues={{ 
                title: modalView === 'add' ? '' : data?.title?.rendered, 
                content: modalView === 'add' ? '' : data?.content?.rendered
              }}
              validate={values => {
                // do validation here, and return errors object
              }}
              onSubmit={ (e) => modalView === 'add' ? dispatch(createSpoiler({...e, setStatus})) : dispatch(updateSpoiler({...e, spoilerId, setStatus}))}
            >
              {({ handleSubmit, pristine, form, submitting }) => (
                
                  <SemanticForm onSubmit={handleSubmit} loading={isFetching}>
                    <Field name="title" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <SemanticForm.Field required>
                            {/* <label>Title</label> */}
                            <SemanticForm.Input {...input} fluid 
                              label="Title" 
                              type="text" 
                              placeholder="Title" 
                              error={meta.error && meta.touched}
                              // error={meta.error && meta.touched &&{
                              //   content: 'Title is required',
                              //   pointing: '',
                              // }}
                            />
                          </SemanticForm.Field>
                        </div>
                      )}
                    </Field>
                    <br />
                    <Field name="content" validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <SemanticForm.Field required>
                            <label>Content</label>
                            <SemanticForm.TextArea {...input} fluid
                              type="text" 
                              placeholder="Content" 
                              error={meta.error && meta.touched}
                              // error={meta.error && meta.touched && {
                              //   content: 'Content is required',
                              //   pointing: 'below',
                              // }}
                            />
                          </SemanticForm.Field>
                          </div>
                        )}
                    </Field>
                    <br />
                    <SemanticForm.Group inline className="form-actions">
                      <Button 
                        type='submit'
                        disabled={submitting}
                        primary>Submit</Button>
                      <Button 
                        type='submit'
                        onClick={form.reset} disabled={pristine || submitting}>Reset</Button>
                    </SemanticForm.Group>
                  </SemanticForm>

                )
              }
              
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
  </>
}

export default AddSpoiler;