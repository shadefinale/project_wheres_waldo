class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.references :character
      t.references :game
      t.float :xoffset
      t.float :yoffset
      t.timestamps null: false
    end
  end
end
