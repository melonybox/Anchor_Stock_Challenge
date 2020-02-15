class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :price, :amount
end
