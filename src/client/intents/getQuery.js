import Rx from 'rx';
import Root from '../components/Root';

export const getQuery$ = new Rx.ReplaySubject(1);
getQuery$.onNext(Root.queries);

export const onModelChangeGetQuery = () => getQuery$.onNext(Root.queries);
