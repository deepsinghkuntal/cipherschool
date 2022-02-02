class App extends React.Component {
  
    render(){
      return(
        <TodoList className="TodoList" />
      )
    }
  }
  
  class TodoList extends React.Component {
    
    constructor(props){
      super(props)
      this.state = {Todos: [
        {text: "Walk Dog", id: uuid(), complete: false}, 
        {text: "Buy Carrots", id: uuid(), complete: false}
      ]}
      this.addTodo = this.addTodo.bind(this)
      this.deleteTodo = this.deleteTodo.bind(this)
      this.changeTodo = this.changeTodo.bind(this)
      this.completeTodoToggle = this.completeTodoToggle.bind(this)
    }
    
    addTodo(text){
      let newTodo = {text: text, id: uuid(), complete: false}
      this.setState({
        Todos: [...this.state.Todos, newTodo]
      })
    }
    
    changeTodo(text, id){
      let newTodo = {text: text, id: id, complete: false}
      let idx = this.state.Todos.findIndex(todo => todo.id === id)
      let updatedTodos = this.state.Todos
      updatedTodos.splice(idx, 1, newTodo)    
      this.setState({
        Todos: updatedTodos
      })
    }
    
    completeTodoToggle(id){
      let idx = this.state.Todos.findIndex(todo => todo.id === id)
      let oldTodo = this.state.Todos.find(todo => todo.id === id)
      let completedTodo = oldTodo
      completedTodo.complete = !oldTodo.complete
      let todos = this.state.Todos
      todos.splice(idx, 1, completedTodo)
      
      this.setState({
        Todos: todos
      }, console.log(this.state.Todos))
    }
    
    deleteTodo(id){
      this.setState({
        Todos: this.state.Todos.filter(todo => todo.id !== id)
      })
    }
    
    render(){
      
      let Todos = (this.state.Todos.map(
        (t) => 
        <div className="Todo-container">
          <li>
            <Todo 
              delete={this.deleteTodo}
              change={this.changeTodo}
              complete={this.completeTodoToggle}
              done={t.complete}
              key={t.id} 
              id={t.id} 
              text={t.text} 
              />
           </li>
          <hr/>
         </div>
      ))
          
      return(
        <div className="TodoList container">
          <h1>Todo List</h1>
          <AddTodoForm AddTodo={this.addTodo} />
          <ul>          
            {Todos}
          </ul>
        </div>
      )
    }
  }
  
  class AddTodoForm extends React.Component {
    
    constructor(props){
      super(props)
      this.state = {text: ""}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(evt){
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
    
    handleSubmit(evt){
      evt.preventDefault()
      
      this.setState({text: ""})
      this.props.AddTodo(this.state.text)
    }
    
    render () {
      return(
        <div className="AddTodoForm">
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Write New Todo"
              spellcheck="false"
              autocomplete="off"
              onChange={this.handleChange} 
              value={this.state.text} 
              name="text" 
              type="text" 
            />
            <button type="submit"><i className="fa fa-plus"/></button>
          </form>
        </div>
      )
    }
  }
  
  class Todo extends React.Component {
    
    constructor(props){
      super(props)
      //this.state = {done: false}
      this.handleSpanClick = this.handleSpanClick.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleSpanClick(evt){
      //this.setState({done: !this.state.done})
      this.props.complete(this.props.id)
      console.log("After")
    }
    
    handleDelete(evt){
      this.props.delete(this.props.id)
    }
    
    handleChange(evt){
      evt.preventDefault()
      
      this.props.change(evt.target.textContent, this.props.id)
    }
    
    render() {
      return(
        <div className={this.props.done ? "Todo completed" : "Todo loading"}>
          <span 
            className="Todo-icon Todo-check"
            onClick={this.handleSpanClick}>
            <i className="fa fa-check" />
          </span>
          <span 
            className="Todo-text"
            spellcheck="false"
            contenteditable="true"
            onBlur={this.handleChange}
            >
          {this.props.text}
          </span>
          <span 
            className="Todo-icon Todo-trash"
            onClick={this.handleDelete}>
            <i className="fa fa-trash" />
          </span>        
        </div>
      )
    }
  }
  
  
  ReactDOM.render(
    <App />,  document.getElementById("root"), function(){
    setTimeout(function() {
      document.getElementsByClass("loading").forEach(function(el){
        el.classList.remove('loading')}, 1000)
    })
  })