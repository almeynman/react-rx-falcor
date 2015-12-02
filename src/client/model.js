import Rx from 'rx';
import falcor from 'falcor';
import FalcorHttpDatasource from 'falcor-http-datasource';

const state$ = new Rx.ReplaySubject(1);

const rootModel = new falcor.Model({
  source: new FalcorHttpDatasource('/model.json', {
    crossDomain: true
  }),
  onChange() {
    if (typeof rootModel === 'undefined') {
      return;
    }
    triggerDataFetch();
  }
});

function triggerDataFetch() {
  rootModel.
    get('todos[0..9]["text", "completed"]').
    then(data => state$.onNext(data.json));
}

triggerDataFetch();

const model = ({addTodo$}) => {
  addTodo$.subscribe(newTodo =>
    rootModel.
      call(['todos', 'add'], [newTodo], ['text', 'completed']).
      then(data => state$.onNext(data.json))
    // state.todos.push({text: newTodo, completed: false}) && state$.onNext(state)
  )
  return state$;
}
export default model;
