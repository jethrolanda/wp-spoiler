import SpoilerListTable from './SpoilerListTable'
import { connect } from "react-redux";
import AddSpoiler from './AddSpoiler';


const Home = (props) => {
  
  return <div>
      <AddSpoiler />
      <SpoilerListTable />
  </div>
}

const mapStateToProps = (store) => ({
  form: store?.form?.spoiler?.values
});

export default connect(mapStateToProps)(Home)