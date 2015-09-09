Rails.application.routes.draw do
  get "game", to: "game#game"
  resources :tags, only: [:create, :index, :destroy]
  resources :characters, only: :index
end
