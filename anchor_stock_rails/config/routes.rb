Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :stocks

      get "/auto_login", to: "auth#auto_login"
      post "/login", to: "auth#login"
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
