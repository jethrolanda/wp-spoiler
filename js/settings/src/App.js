import { Icon, Menu, Divider, Grid } from 'semantic-ui-react'
import Home from './components/Home'
import Setting from './components/Setting'
import {
    useSearchParams,
    Link
  } from "react-router-dom";

const App = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
        <>
            <div>
                <h2 className='app-title'>Spoiler</h2>
                <Divider />
                <Grid stackable columns={2}>
                    <Grid.Column mobile={16} tablet={16} computer={2} widescreen={1}>
                        <Menu compact icon='labeled' vertical>
                            <Link to="?page=spoiler_settings">
                                <Menu.Item 
                                    name='home'
                                    active={searchParams.get('path') === null}>
                                    <Icon name='home' />Home
                                </Menu.Item>    
                            </Link>
                            
                            <Link to="?page=spoiler_settings&path=/setting">
                                <Menu.Item 
                                    name='setting'
                                    active={searchParams.get('path') === '/setting'}>
                                    <Icon name='setting' />Setting</Menu.Item>
                            </Link>
                            
                        </Menu>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={14} widescreen={15}>
                        { searchParams.get('path') === '/setting' ? <Setting/> : <Home/> }
                        {/* <Routes>
                            <Route index element={<Home />} />
                            <Route path="setting" element={<Setting />}>
                            </Route>
                        </Routes> */}
                    </Grid.Column>
                </Grid>
            </div>
        </>
    );
}

export default App; 