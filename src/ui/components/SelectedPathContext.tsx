import React from 'react';

export default React.createContext({
    selectedPath: '',
    select: (selectedPath: string) => {},
});