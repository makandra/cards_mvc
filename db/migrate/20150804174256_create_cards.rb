class CreateCards < ActiveRecord::Migration

  def change
    create_table :cards do |t|
      t.timestamps

      t.string :title
      t.text :body
    end
  end

end
