import React, {useMemo, useState} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Text} from 'react-native';
import './console';
import Test from './Test';

function App() {
    const [count, setCount] = useState(0);

    const testValue = useMemo(() => {
        return 'test';
        return `count: ${count}`;
    }, []);

    return (
        <>
            <Text style={{color: 'black'}}>{count}</Text>
            <Text
                style={{color: 'black'}}
                onPress={() => setCount(count + 1)}
            >
                button
            </Text>
            <Test />
            <Text>{testValue}</Text>
        </>
    );
}

App.displayName = 'App';

export default App;
