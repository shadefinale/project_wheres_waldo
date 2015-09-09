class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def find_or_create_game
    unless session[:game_id]
      session[:game_id] = SecureRandom.urlsafe_base64(nil, false)
    end

    return Game.find_or_create_by(token: session[:game_id])
  end
end
