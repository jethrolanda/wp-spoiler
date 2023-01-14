import { useState } from 'react';
import { Icon, Menu, Divider, Grid, Header, Image } from 'semantic-ui-react'
import Home from './components/Home'
import Setting from './components/Setting'

const App = () => {

    const [active, setActive] = useState('home');

    const handleItemClick = (e, {name}) => {
        setActive(name)
    }

    return (
        <>
            <div>
                <h2 className='app-title'>Spoiler</h2>
                <Divider />
                <Grid stackable columns={2}>
                    <Grid.Column mobile={16} tablet={16} computer={2} widescreen={1}>
                        <Menu compact icon='labeled' vertical>
                            <Menu.Item 
                                name='home'
                                active={active === 'home'}
                                onClick={handleItemClick}>
                                <Icon name='home' />Home
                            </Menu.Item>

                            <Menu.Item 
                                name='setting'
                                active={active === 'setting'}
                                onClick={handleItemClick}>
                                <Icon name='setting' />Setting</Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={14} widescreen={15}>
                        { active === 'setting' ? <Setting/> : <Home/> }
                    </Grid.Column>
                </Grid>
            </div>
        </>
    );
}

export default App; 