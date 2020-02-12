class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.integer :amount
      t.float :price

      t.timestamps
    end
  end
end
