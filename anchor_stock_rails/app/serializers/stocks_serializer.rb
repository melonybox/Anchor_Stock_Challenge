class StocksSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :price
end
