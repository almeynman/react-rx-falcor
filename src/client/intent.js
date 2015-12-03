import Rx from 'rx';
import { addTodo$ } from './intents/addTodo';
import { getQuery$ } from './intents/getQuery';
const intent = () => ({
  addTodo$,
  getQuery$
})

export default intent;
