import { useState, useCallback } from 'react';
import TestTable from './Table'
import axios from '../helpers/axios';
import { connect } from "react-redux";
import AddSpoiler from './AddSpoiler';


const Home = (props) => {
  console.log(props)
  const { form } = props;
  
  const createSpoiler = useCallback((props) => {
    console.log(form,props)
    if(props?.title !== '' && props?.content !== ''){
      
      const { title, content, setStatus } = props;
      
      axios.post(`wp/v2/spoiler`, {
        title,
        content,
        status: 'publish'
      })
      .then(response=>{
        if(response.statusText == 'Created') {
          setStatus('success')
        } else {
          setStatus('fail')
        }
        
        console.log(response)
      })
    }
  }, [form]);

  return <div>
      <AddSpoiler />
      <TestTable />
  </div>
}

const mapStateToProps = (store) => ({
  form: store?.form?.spoiler?.values
});

export default connect(mapStateToProps)(Home)