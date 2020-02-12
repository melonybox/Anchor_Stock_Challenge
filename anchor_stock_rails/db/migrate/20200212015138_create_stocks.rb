class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.belongs_to :user, foreign_key: true
      t.string :symbol
      t.integer :amount
      t.float :price

      t.timestamps
    end
  end
end
