class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :price
end
