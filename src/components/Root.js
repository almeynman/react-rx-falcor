import React from 'react';
import TodoList from './TodoList';

const Root = (state) => <div>
  <TodoList {...state} />
</div>

Root.queries = TodoList.queries;

export default Root;
