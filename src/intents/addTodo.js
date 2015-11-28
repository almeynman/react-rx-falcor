import Rx from 'rx';

export const addTodo$ = new Rx.Subject();

export const handleAddTodo = e => addTodo$.onNext(e.target.value);
