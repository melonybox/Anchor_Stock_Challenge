class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.has_many :stocks, foreign_key: true
      t.string :username
      t.string :email
      t.string :password_digest
      t.float :money

      t.timestamps
    end
  end
end
