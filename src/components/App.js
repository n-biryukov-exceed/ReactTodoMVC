import React, {Component} from 'react'
import Header from './Header'
import MainSection from './MainSection'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2500,
  draggable: false,
})

const initialState = [
  {
    text: 'Example Task',
    completed: false,
    id: 0
  }
]


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: initialState,
    }
  }

  addTodo = (text) => {
    const todos = [
      {
        id: +new Date(),
        completed: false,
        text: text
      },
      ...this.state.todos
    ]
    this.setState({todos})
    toast.info("New task added!")
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({todos})
  }

  editTodo = (id, text) => {
    const todos = this.state.todos.map(todo =>
      todo.id === id ? {...todo, text} : todo
    )
    this.setState({todos})
  }

  completeTodo = (id) => {
    const todos = this.state.todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
    this.setState({todos})
  }

  completeAll = () => {
    const areAllMarked = this.state.todos.every(todo => todo.completed)
    const todos = this.state.todos.map(todo => {
      return {...todo, completed: !areAllMarked}
    })
    this.setState({todos})
  }

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.completed === false)
    this.setState({todos})
    toast.error("All tasks have been deleted!")
  }

  actions = {
    addTodo: this.addTodo,
    deleteTodo: this.deleteTodo,
    editTodo: this.editTodo,
    completeTodo: this.completeTodo,
    completeAll: this.completeAll,
    clearCompleted: this.clearCompleted
  }

  render() {
    return(
      <div>
        <Header addTodo={this.actions.addTodo} />
        <MainSection todos={this.state.todos} actions={this.actions} />
      </div>
    )
  }
}

export default App
