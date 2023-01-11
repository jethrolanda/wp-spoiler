import { useState, useCallback } from 'react'
import { Button, Modal, Form, Message } from 'semantic-ui-react'
import { Field, reduxForm } from "redux-form";

const validate = values => {
  
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.content) {
    errors.content = 'Required'
  }
  return errors
}

const renderTextField = field => (
  <>
    <Form.Input
      {...field.input}
      label={field.label}
      placeholder={field.placeholder}
    />
    <Message
      error
      header='Action Forbidden'
      content={field.meta.error}
      hidden={field.meta.error ? true : false}
    />
  </>
);

const renderTextArea = field => (
  <>
    <Form.TextArea
      {...field.input}
      label={field.label}
      placeholder={field.placeholder}
    />
    <Message
      error
      header='Action Forbidden'
      content={field.meta.error}
      hidden={field.meta.error ? true : false}
    />
  </>
);

const FormStatus = (props) => {
  const { status } = props;
  
  return typeof status !== 'undefined' ? (
    <>
      { status === 'success' ? <Message positive>
        <Message.Header>Successfully created!</Message.Header>
      </Message> : <Message negative>
        <Message.Header>Successfully created!</Message.Header>
      </Message>}
      
    </>) : <></>
}

const AddSpoiler = (props) => {

  const { reset, pristine, submitting, handleSubmit, modalActive, setModalActive, createSpoiler } = props;
  // const { status, setStatus } = useState(false);
  // const { btnLoading, setBtnLoading } = useState(false);

  const onBtnClick = useCallback((e) => {
    
  //     console.log(setBtnLoading)
  //     setBtnLoading(true); 
      createSpoiler(e, setModalActive); 

  }, []);

  return <>
    <Modal
        onClose={() => setModalActive(false)}
        onOpen={() => setModalActive(true)}
        open={modalActive}
        trigger={<Button primary>Add Spoiler</Button>}
      >
        <Modal.Header>Add Spoiler</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
          <FormStatus/>
            <Form onSubmit={ (e) => createSpoiler(e, setModalActive) }>
              <Form.Group widths="equal">
                <Field
                  component={renderTextField}
                  label="Title"
                  name="title"
                  placeholder="Title"
                />
              </Form.Group>

              <Field
                component={renderTextArea}
                label="Content"
                name="content"
                placeholder="The spoiler"
              />

              <Form.Group inline className="form-actions">
                <Form.Button primary 
                  // onClick={onBtnClick} 
                  loading={false}
                  disabled={submitting}>Submit</Form.Button>
                <Form.Button onClick={()=>reset()} disabled={pristine || submitting}>Reset</Form.Button>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
  </>
}

export default reduxForm({
  form: "spoiler",
  validate
})(AddSpoiler);