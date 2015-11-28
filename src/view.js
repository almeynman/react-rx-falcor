import React from 'react';
import Root from './components/Root';

const view = (state$) => state$.map(state => {
    return <Root {...state} />
});

export default view;
