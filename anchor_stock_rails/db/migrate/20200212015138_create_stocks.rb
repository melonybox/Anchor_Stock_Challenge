class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.integer :amount
      t.float :price
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
