import React, {useMemo} from 'react';
import {Text} from 'react-native';

function ApprovalWorkflowSection({workflow}) {
    const members = useMemo(() => {
        if (workflow.isDefault) {
            return 'Everyone';
        }

        return '';

        return workflow.members.map((m) => m.displayName).join(', ');
    }, [workflow.isDefault, workflow.members]);

    return <Text>{members}</Text>;
}

export default ApprovalWorkflowSection;
