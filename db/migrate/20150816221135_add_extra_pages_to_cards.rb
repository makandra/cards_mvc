class AddExtraPagesToCards < ActiveRecord::Migration

  def change
    add_column :cards, :extra_pages, :text
  end

end
