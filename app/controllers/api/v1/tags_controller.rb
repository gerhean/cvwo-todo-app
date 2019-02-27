class Api::V1::TagsController < ApplicationController
  def index
    render json: Tag.all
  end

  def create
    tag = Tag.find_or_create_by(name: params[:name])
    todo = Todo.find(params[:id])
    todo.tags << tag
    render json: tag.to_json
  end

end