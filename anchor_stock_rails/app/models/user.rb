class User < ApplicationRecord
  validates :email, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  attribute :money_amount, :float, default: 5000.00

  has_many :stocks

  has_secure_password
end
