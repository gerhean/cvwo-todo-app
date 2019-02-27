class Body extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.filterTodoByTag = this.filterTodoByTag.bind(this);
    this.refreshTodo = this.refreshTodo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  
  handleFormSubmit(name, description){
    let body = JSON.stringify({todo: {name: name, description: description} })
    fetch('http://localhost:3000/api/v1/todos#create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((todo)=>{
      this.addNewTodo(todo)
    })
  }

  addNewTodo(todo){
    this.setState({
      todos: this.state.todos.concat(todo)
    })
  }

  handleDelete(id){
    fetch(`http://localhost:3000/api/v1/todos/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        this.deleteTodo(id)
      })
  }
  
  deleteTodo(id){
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    })
  }

  handleUpdate(todo){
    fetch(`http://localhost:3000/api/v1/todos/${todo.id}`, 
    {
      method: 'PUT',
      body: JSON.stringify({todo: todo}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        this.updateTodo(todo)
      })
  }
  updateTodo(todo){
    let newTodos = this.state.todos.filter((f) => f.id !== todo.id)
    newTodos.push(todo)
    this.setState({
      todos: newTodos
    })
  }

  filterTodoByTag(name){
    fetch(`http://localhost:3000/api/v1/todo/filterbytag/true/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {return response.json()})
    .then((todos)=> {
      this.refreshTodo(todos)
    })
  }

  refreshTodo(todos) {
    this.setState({
      todos: todos
    })
  }

  componentDidMount(){
    fetch('/api/v1/todos.json')
    .then((response) => {return response.json()})
    .then((data) => {this.setState({ todos: data })});
  }
	
	
  render(){
    return(
    <div>
      <NewTodo handleFormSubmit={this.handleFormSubmit}/>
      <FilterTodo filterTodoByTag={this.filterTodoByTag}/>
      <AllTodos 
        todos={this.state.todos} 
        handleDelete={this.handleDelete}
        handleUpdate={this.handleUpdate}
      />
    </div>
    )
  }
  
}