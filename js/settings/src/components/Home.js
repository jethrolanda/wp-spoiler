import TestTable from './Table'
import { connect } from "react-redux";
import AddSpoiler from './AddSpoiler';


const Home = (props) => {
  
  return <div>
      <AddSpoiler />
      <TestTable />
  </div>
}

const mapStateToProps = (store) => ({
  form: store?.form?.spoiler?.values
});

export default connect(mapStateToProps)(Home)