import React from 'react';
import { handleAddTodo } from '../intents/addTodo';

const TodoList = ({todos}) => <div>
  <ul>
    {todos.map(todo => <li>{todo.text}</li>)}
  </ul>
  <div>
    <span>Add new Todo</span>
    <input type="text" onKeyDown={e => e.keyCode === 13 && handleAddTodo(e)}/>
  </div>
</div>

TodoList.queries = ['todos', {from: 0, to: 9}, ['text', 'completed']];

export default TodoList;
