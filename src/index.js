import React from 'react';
import ReactDOM from 'react-dom';
import falcor from 'falcor';
import _ from 'lodash';
import Rx from 'rx';
const $ref = falcor.Model.ref;
const $pathValue = falcor.Model.pathValue;

const App = ({todos = []}) => <div>
  {_.values(todos).map((todo, index) => <TodoListItem todo={todo} index={index} />)}
</div>;

const TodoListItem = ({todo, index}) => <div>
  {todo.text} - {todo.completed.toString()}
  <button onClick={e =>
    rootModel.set($pathValue(`todos[${index}]["completed"]`, true)).subscribe()
  }>Check as done</button>
</div>;

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

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
    modelChanges.onNext(rootModel);
  }
});

const modelChanges = new Rx.BehaviorSubject(rootModel);

modelChanges.
  flatMapLatest(model => model.
    get('todos[0..1]["text", "completed"]')).
  // get('todos', 0, ['text', 'completed']).
  subscribe(({json}) =>
    ReactDOM.render(<App todos={json.todos} />, rootElement)
    // {console.log(data);ReactDOM.render(<App todos={data.json.todos} />, rootElement)}
    // ReactDOM.render(<TodoListItem todo={data.json.todos['0']} />, rootElement)
    // console.log(JSON.stringify(_.values(data.json.todos)))
  )
