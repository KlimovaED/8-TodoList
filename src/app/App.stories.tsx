import App from './App';
import {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecoraor} from '../stories/ReduxStoreProviderDecoraor';

const meta:Meta<typeof App>={
    title:'TODOLISTS/App',
    component:App,
    decorators:[ReduxStoreProviderDecoraor],
    tags:['autodocs']
}

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory=()=>{
    return <App demo={true}/>
}
