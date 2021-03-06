import React, {Component} from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'

 const TODO_FILTERS = {
   SHOW_ALL: () => true,
   SHOW_ACTIVE: todo => !todo.completed,
   SHOW_COMPLETED: todo => todo.completed
 }

 export default class MainSection extends Component {
   state = { filter: 'SHOW_ALL' }

   handleClearCompleted = () => {
     this.props.actions.clearCompleted()
   }

   handleShow = filter => {
     this.setState({ filter })
   }

   renderToggleAll(completedCount) {
     const { todos, actions } = this.props
     if (todos.length > 0) {
       return (
         <section className="main2">
         <input
           id="toggle-all"
           className="toggle-all"
           type="checkbox"
           checked={completedCount === todos.length}
           onChange={actions.completeAll}
         />
         <label
          htmlFor="toggle-all">
         </label>
        </section>
       )
     }
   }

   renderFooter(completedCount) {
     const { todos } = this.props
     const { filter } = this.state
     const activeCount = todos.length - completedCount

     if (todos.length) {
       return (
         <Footer
           completedCount={completedCount}
           activeCount={activeCount}
           filter={filter}
           onClearCompleted={this.handleClearCompleted.bind(this)}
           onShow={this.handleShow.bind(this)} />
       )
     }
   }

   render() {
     const { todos, actions } = this.props
     const { filter } = this.state

     const filteredTodos = todos.filter(TODO_FILTERS[filter])
     const completedCount = todos.reduce((count, todo) => {
       return todo.completed ? count + 1 : count
     }, 0)

     return (
       <section className="main">
         {this.renderToggleAll(completedCount)}
         <ul className="todo-list">
           {filteredTodos.map(todo =>
             <TodoItem key={todo.id} todo={todo} {...actions} />
           )}
         </ul>
         {this.renderFooter(completedCount)}
       </section>
     )
   }
 }
