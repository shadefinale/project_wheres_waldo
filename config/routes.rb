Rails.application.routes.draw do
  root to: "games#game"
  resources :tags, only: [:create, :index, :destroy]
  resources :characters, only: :index
  resource :game, only: :show
end
