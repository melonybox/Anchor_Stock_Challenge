class User < ApplicationRecord
  has_many :stocks

  has_secure_password
end
