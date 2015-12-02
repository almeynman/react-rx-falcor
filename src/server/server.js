import falcorServer from 'falcor-express';
import bodyParser from 'body-parser';
import express from 'express';
import Router from 'falcor-router';

const app = express();

const db = {
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

const TodosRouter = Router.createClass([
  {
    route: 'todos[{integers:todoIndexes}]["text", "completed"]',
    get: pathSet => pathSet.todoIndexes.
      filter(todoIndex => db.todos.length > todoIndex).
      map(todoIndex => ({
        path: ['todos', todoIndex, 'text'],
        value: db.todos[todoIndex].text
      }))
  },
  {
    route: 'todos.add',
    call: (callPaths, args) => {
      const newTodo = args[0];
      db.todos.push({ text: newTodo, completed: false });
      return [
        {
          path: ['todos', db.todos.length-1, ['text', 'completed']]
        }
      ]
    }
  }
]);

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.use('/model.json', falcorServer.dataSourceRoute(() => new TodosRouter));
app.listen(3000, err => err ? console.log(err) : console.log('navigate to localhost:3000'))
