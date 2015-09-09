Rails.application.routes.draw do
  get "game", to: "game#game"

  resources :characters, only: :index
end
