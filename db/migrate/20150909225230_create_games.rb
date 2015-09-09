class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :token
      t.timestamps null: false
    end
  end
end
