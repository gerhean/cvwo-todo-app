class Todo < ApplicationRecord
	has_many :todo_tags
  has_many :tags, through: :todo_tags
end
