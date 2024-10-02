import React, {useMemo, useState} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Text} from 'react-native';
import './console';
import Test from './Test';
import ApprovalWorkflowSection from './ApprovalWorkflowSection';

const APPROVAL_WORKFLOWS = [
    {
        members: [
            {email: 'blazej.kustra+1@swmansion.com', displayName: 'Blazej Kustra'},
            {email: 'blazej.kustra@swmansion.com', displayName: 'Błażej Kustra'},
        ],
        isDefault: true,
    },
    {
        members: [
            {email: 'blazej.kustra+1@swmansion.com', displayName: 'Blazej Kustra'},
            {email: 'blazej.kustra@swmansion.com', displayName: 'Błażej Kustra'},
        ],
        isDefault: false,
    },
];

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
            <ApprovalWorkflowSection workflow={APPROVAL_WORKFLOWS[0]} />
            <ApprovalWorkflowSection workflow={APPROVAL_WORKFLOWS[1]} />
        </>
    );
}

App.displayName = 'App';

export default App;
