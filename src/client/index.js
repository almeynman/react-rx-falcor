import React from 'react';
import ReactDOM from 'react-dom';

import intent from './intent';
import model from './model';
import view from './view';

const main = () => view(model(intent()));

main().subscribe(Output => ReactDOM.render(Output, document.body));
