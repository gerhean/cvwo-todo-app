const FilterTodo = (props) => {
  let formFields = {}
 
  return(
    <form onSubmit={ 
      (e) => { 
        props.filterTodoByTag(formFields.name.value); 
        e.target.reset();
        e.preventDefault();
      }
    }>
      <p>Enter the tag to filter by</p>
      <input ref={input => formFields.name = input} placeholder='Enter tag name'/>
      <button>Submit</button>
    </form>
  )
}