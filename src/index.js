import React from 'react';
import { render } from 'react-dom';
import falcor from 'falcor';
import _ from 'lodash';
const $ref = falcor.Model.ref;
const $pathValue = falcor.Model.pathValue;

const App = ({todos = []}) => <div>
  {_.values(todos).map((todo, index) => <TodoListItem todo={todo} index={index} />)}
  <AddTodo />
</div>;

const TodoListItem = ({todo, index}) => <div>
  {todo.text} - {todo.completed.toString()}
  <button onClick={e =>
    rootModel.set($pathValue(`todos[${index}]["completed"]`, todo.completed ? false : true)).subscribe()
  }>Check as done</button>
</div>;

const AddTodo = () => <div>

</div>;

var rootModel = new falcor.Model({
  // source: new falcor.HttpDataSource('./model.json');
  cache: {
    usersById: {
      0: { name: 'Almas' },
      1: { name: 'Dias' },
    },
    todos: [
      {
        text: 'check falcor',
        completed: false,
        user: $ref('usersById[0]'),
        createdAt: new Date(),
      },
      {
        text: 'do some codewar tasks',
        completed: false,
        user: $ref('usersById[0]'),
        createdAt: new Date(),
      },
      {
        text: 'finish pluralsight',
        completed: false,
        user: $ref('usersById[1]'),
        createdAt: new Date(),
      }
    ]
  },
  onChange: () => {
    if (typeof rootModel === 'undefined') {
      return;
    }
    triggerRender();
  }
});

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

function triggerRender() {
  rootModel.get('todos[0..1]["text", "completed"]').then(({ json }) =>
    render(<App todos={json.todos}/>, rootElement)
  )
};
triggerRender();
