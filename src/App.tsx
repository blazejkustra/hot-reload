import React, {useState} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Text} from 'react-native';
import './console';
import Test from './Test';

function App() {
    const [count, setCount] = useState(0);
    return (
        <>
            <Text style={{color: 'black'}}>{count}</Text>
            <Text
                style={{color: 'black'}}
                onPress={() => setCount(count + 1)}
            >
                button22222
            </Text>
            <Test />
        </>
    );
}

App.displayName = 'App';

export default App;
