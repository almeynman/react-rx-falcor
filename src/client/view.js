import React from 'react';
import _ from 'lodash';
import Root from './components/Root';

const view = (state$) => state$.map(state => <Root todos={_.values(state.todos)} />);

export default view;
