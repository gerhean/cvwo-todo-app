class CreateTodoTags < ActiveRecord::Migration[5.2]
  def change
    create_table :todo_tags do |t|
    	t.belongs_to :todo, index: true
      t.belongs_to :tag, index: true
      t.integer :todo_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
