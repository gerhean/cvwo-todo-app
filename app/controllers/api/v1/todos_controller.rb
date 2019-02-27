class Api::V1::TodosController < ApplicationController
  def index
    render json: Todo.all.to_json(:include => :tags)
  end

  def create
    todo = Todo.create(todo_params)
    render json: todo
  end

  def destroy
    Todo.destroy(params[:id])
  end

  def update
    todo = Todo.find(params[:id])
    todo.update_attributes(todo_params)
    render json: todo
  end

  def show
    if params[:filterByTag] == "true"
      tag = Tag.find_by(name: params[:tagName])
      render json: tag.todos.to_json(:include => :tags)
    else
      render json: Todo.all.to_json(:include => :tags)
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :name, :description)
  end
end