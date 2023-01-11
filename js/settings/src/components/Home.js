import { useState, useCallback } from 'react';
import TestTable from './Table'
import axios from '../helpers/axios';
import { connect } from "react-redux";
import AddSpoiler from './AddSpoiler';


const Home = (props) => {
  console.log(props)
  const { form } = props;
  const [modalActive, setModalActive] = useState(false)

  const createSpoiler = useCallback((props) => {
    console.log(form)
    if(typeof form !== 'undefined'){
      console.log(props)
      const { setModalActive } = props;
      const { title, content } = form;
      
      axios.post(`wp/v2/spoiler`, {
        title,
        content,
        status: 'publish'
      })
      .then(response=>{
        setModalActive(false)
        console.log(response)
      })
    }
  }, [form]);

  return <div>
      <AddSpoiler modalActive={modalActive} setModalActive={setModalActive} createSpoiler={createSpoiler}/>
      <TestTable />
  </div>
}

const mapStateToProps = (store) => ({
  form: store?.form?.spoiler?.values
});

export default connect(mapStateToProps)(Home)