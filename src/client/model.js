import Rx from 'rx';
import falcor from 'falcor';
import FalcorHttpDatasource from 'falcor-http-datasource';
import Root from './components/Root';
import { onModelChangeGetQuery } from './intents/getQuery';

const state$ = new Rx.ReplaySubject(1);

const rootModel = new falcor.Model({
  source: new FalcorHttpDatasource('/model.json'),
  onChange() {
    onModelChangeGetQuery();
  }
});

const model = ({addTodo$, getQuery$}) => {
  addTodo$.subscribe(newTodo => rootModel.
    call(['todos', 'add'], [newTodo], ['text', 'completed']).
    then(data => state$.onNext(data.json))); // TODO state$.onNext is not necessary here

  getQuery$.subscribe(query => rootModel.
    get(query).
    then(data => {console.log(data);state$.onNext(data.json)}));

  return state$;
}
export default model;
