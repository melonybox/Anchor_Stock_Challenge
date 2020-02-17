class ApplicationController < ActionController::API
  def encode_token(user_id)
    JWT.encode({user_id: user_id}, "pizzatime")
  end
  # encode user to jwt tokent

  def get_auth_headers
    request.headers["Authorization"]
  end
  # only work if headers has this string

  def decode_token
    begin
      JWT.decode(get_auth_headers, "pizzatime")[0]["user_id"]
    rescue
      nil
    end
  end
  # decode user token for autologin, not used

  def session_user
    User.find_by(id: decode_token)
  end
end
