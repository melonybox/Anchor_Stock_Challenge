class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :money_amount, :stocks

  def stocks
    ActiveModel::SerializableResource.new(object.stocks,  each_serializer: StockSerializer)
  end
end
