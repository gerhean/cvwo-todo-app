const NewTodo = (props) => {
  let formFields = {}
 
  return(
    <form onSubmit={ 
      (e) => { 
        props.handleFormSubmit(formFields.name.value, formFields.description.value); 
        e.target.reset();
        e.preventDefault();
      }
    }>
      <p>Enter the name of the item</p>
      <input ref={input => formFields.name = input} placeholder='Enter the name of the item'/>
      <p>Enter a description</p>
      <input ref={input => formFields.description = input} placeholder='Enter a description' />
      <button>Submit</button>
    </form>
  )
}