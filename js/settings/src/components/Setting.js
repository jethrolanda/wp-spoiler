import { useState, useEffect } from 'react';
import { Form, Grid, Divider, Message, Transition, Loader } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import {
    settings,
    setSettings,
    fetchSettings,
    saveSettings,
    setLoading,
    loading
  } from '../store/reducer/settingsSlice';

const Setting = () => {
    
    const [visible, setVisible] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const dispatch = useDispatch();
    let settingsData = useSelector(settings);
    let data = {...settingsData};
    const isLoading = useSelector(loading);
    
    const formSubmit = (e) => {
        dispatch(saveSettings({
            data,
            cb: () => setVisible(true)
        }))
    }
    
    const onChange = (e, { name, value }) => {
        
        if(name === 'apply_to_ff_users'){
            if(typeof data?.[name] != 'undefined') {
                if(data?.[name].includes(value)){
                    console.log(1)
                    data[name] = data[name].filter(item => item !== value);
                } else {
                    console.log(2)
                    data[name] = [...data[name], value];
                }
            } else {
                data[name] = [value];
            }
        } else {
            
            if(typeof data[name] != 'undefined') {
                delete data?.[name];
            } else {
                
                data[name] = value;
            }
        }
        
        dispatch(setSettings(data));
        
    }

    useEffect(()=> {
        if(isLoading === null) {
            dispatch(setLoading(true));
            dispatch(fetchSettings())
        }
    }, [isLoading]);
    
    if(isLoading)
        return <Loader size="large" />;
        
    return (
        <Grid className='wps-setting-spoiler'>
            <Grid.Column>
                <h1>Setting</h1>
                <Transition visible={visible} animation='fade' duration={500} onShow={async()=> {await delay(1000);setVisible(false);}}>
                    <Message positive>
                        <Message.Header>Settings saved</Message.Header>
                    </Message>
                </Transition>
                
                <Form size='big' className="wps-form-settings" onSubmit={(e)=>formSubmit(e)}>
                    <label className="wps-label">Apply the changes on the following users</label>
                    <Form.Checkbox
                        name='apply_to_ff_users'
                        label='Logged-in'
                        value='logged-in'
                        onChange={onChange}
                        defaultChecked={data?.apply_to_ff_users && data?.apply_to_ff_users.includes('logged-in')}
                    />
                    <Form.Checkbox
                        name='apply_to_ff_users'
                        label='Logged-out'
                        value='logged-out'
                        onChange={onChange}
                        defaultChecked={data?.apply_to_ff_users && data?.apply_to_ff_users.includes('logged-out')}
                    />
                    <Divider hidden/>
                    <label className="wps-label">Blur links</label>
                    <Form.Checkbox 
                        name='blur_links' 
                        label='All urls will be blurred' 
                        value='yes' 
                        onChange={onChange}
                        defaultChecked={data?.blur_links}
                    />
                    <Divider hidden/>
                    <label className="wps-label">Show tooltip</label>
                    <Form.Checkbox 
                        name='show_tooltip' 
                        label='Show popup or tooltip when hovering over the spoiler' 
                        value='yes' 
                        onChange={onChange} 
                        defaultChecked={data?.show_tooltip}
                    />
                    <label className="wps-label">Message</label>
                    <textarea 
                        name="tooltip_message" 
                        placeholder='Tooltip message why this is marked as spoiler.'
                        onChange={(e)=> {
                            data['tooltip_message'] = e.target.value;
                            dispatch(setSettings(data));

                        }}
                    >
                        {data?.tooltip_message}
                    </textarea>
                    <br/><br/>
                    <label className="wps-label">Display a button to show the spoiler</label>
                    <Form.Checkbox 
                        name='display_spoiler_button' 
                        label='Toggle the button to show or hide the spoiler.' 
                        value='yes'
                        onChange={onChange}
                        defaultChecked={data?.display_spoiler_button}
                    />
                    <Form.Button primary>Submit</Form.Button>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default Setting;