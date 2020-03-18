import React, {Component} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 3000,
  draggable: false,
})

export default class TodoItem extends Component {
  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
    console.log("edit")
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
      console.log("DeleteBecauseThisTaskIsEmpty")
      toast.error("Task deleted!")
    } else {
      this.props.editTodo(id, text)
      console.log("EditSaved")
      toast.success("Edit Saved!")
    }
    this.setState({ editing: false })
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id) + toast.error("Task deleted!")} />
        </div>
      )
    }

    return (
        <li className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}>
          {element}
        </li>
    )
  }
}
