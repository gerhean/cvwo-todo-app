const AllTodos = (props) => {

  const todos = props.todos.map((todo) => {
    return(
      <div key={todo.id}>
        <TodoCard 
          todo={todo} 
          handleDelete={props.handleDelete} 
          handleUpdate={props.handleUpdate}
        />
      </div>
    )
  })
  
  return(
    <div>
      {todos}
    </div>
  )
  
}