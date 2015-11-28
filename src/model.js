import Rx from 'rx';
import falcor from 'falcor';

const state$ = new Rx.ReplaySubject(1);

const rootModel = new falcor.Model({
  cache: {
    todos: [
      {
        text: 'check out rx',
        completed: false
      },
      {
        text: 'check out falcor',
        completed: false
      },
    ]
  }
});

const state = {
  todos: [
    {
      text: 'check out rx',
      completed: false
    },
    {
      text: 'check out falcor',
      completed: false
    },
  ]
};

state$.onNext(state);

const model = ({addTodo$}) => {
  addTodo$.subscribe(newTodo => state.todos.push({text: newTodo, completed: false}) && state$.onNext(state))
  return state$;
}
export default model;
