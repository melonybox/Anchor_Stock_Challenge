class Api::V1::StocksController < ApplicationController
  def buyStock

    user = User.find(params[:userId])
    totalStockCost = (params[:stockPrice].to_f * params[:stockAmount].to_i)
    # find total stock cost with validations from when it was a text input

    if user.money_amount >= totalStockCost
      # does the user have enough money
      newUserCashAmount = (user.money_amount - totalStockCost).round(2)
      # how much money the user has now
      user.update_attribute(:money_amount, newUserCashAmount)
      # update the attribute without having to pass all params
      stock = Stock.create(price: params[:stockPrice], symbol: params[:stockSymbol], amount: params[:stockAmount], user_id: params[:userId])

      data = {userData: UserSerializer.new(user), newStock: StockSerializer.new(stock)}
      render json: data
    else
			render json: {errors: "Not enough cash for purchase."}
		end
  end
end
