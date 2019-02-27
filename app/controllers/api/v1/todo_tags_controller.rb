class Api::V1::TodoTagsController < ApplicationController
  def index
    render json: TodoTag.all
  end

end