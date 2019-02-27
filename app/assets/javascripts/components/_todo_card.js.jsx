class TodoCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editable: false,
      tags: this.props.todo.tags || []
    }
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.addNewTag = this.addNewTag.bind(this);
    this.handleEdit = this.handleEdit.bind(this)

    this.newTagForm = () => {
      const formFields = {};
      return (
        <form onSubmit={ 
          (e) => { 
            this.handleTagSubmit(formFields.name.value); 
            e.target.reset();
            e.preventDefault();
          }
        }>
          <input ref={input => formFields.name = input} placeholder='Add tag'/>
          <button>Submit</button>
        </form>
      )
    }

    this.allTags = this.state.tags.map((tag) => {
      return(
        <div key={tag.id}>
          <p>{tag.name}</p>
        </div>
      )
    })

  }

  addNewTag(tag) {
    this.setState({
      tags: this.state.tags.concat(tag)
    })
  }

  handleTagSubmit(name) {
    let body = JSON.stringify({id: this.props.todo.id, name: name})
    fetch('http://localhost:3000/api/v1/tags#create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((tag)=>{
      this.addNewTag(tag)
    })
  }

  handleEdit(){
    if(this.state.editable){
      const name = this.name.value
      const description = this.description.value
      const id = this.props.todo.id
      const todo = {id: id, name: name, description: description}
      this.props.handleUpdate(todo)
    }
    this.setState({
      editable: !this.state.editable
    })
  }
  
  render(){
    const name = (
      this.state.editable ? 
        <input 
          type='text' 
          ref={input => this.name = input} 
          defaultValue={this.props.todo.name}
        />
      : 
        <h2>{this.props.todo.name}</h2>
    )
    
    const description = (
      this.state.editable ? 
        <input 
          type='text' 
          ref={input => this.description = input} 
          defaultValue={this.props.todo.description}
        />
      :
        <p>{this.props.todo.description}</p>)
    
    return(
      <div>
        {name}
        {description}

        <button onClick={() => this.handleEdit()}>
          {this.state.editable? 'Submit' : 'Edit'}
        </button>

        <h4>Tags</h4>
        {this.allTags}
        {this.newTagForm()}

        <button 
          onClick={ () => this.props.handleDelete(this.props.todo.id)}
        >
          Delete Todo
        </button>

      </div>
    )      
  }
}
