class Api::V1::StocksController < ApplicationController
  def buyStock

    user = User.find(params[:userId])
    totalStockCost = (params[:stockPrice].to_f * params[:stockAmount].to_i)

    if user.money_amount >= totalStockCost
      newUserCashAmount = (user.money_amount - totalStockCost).round(2)
      user.update_attribute(:money_amount, newUserCashAmount)
      stock = Stock.create(price: params[:stockPrice], symbol: params[:stockSymbol], amount: params[:stockAmount], user_id: params[:userId])

      data = {userData: UserSerializer.new(user), newStock: StockSerializer.new(stock)}
      render json: data
    end
  end
end
