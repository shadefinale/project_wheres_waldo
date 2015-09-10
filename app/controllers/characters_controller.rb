class CharactersController < ApplicationController
  before_action :find_or_create_game
  before_action :check_game_over 
  
  def index
    @game_id = Game.find_by(token: session[:game_id]).id
    p @game_id
    @characters = Character.all.reject{ |character| character.tags.where(game_id: @game_id).count != 0 }
    respond_to do |format|
      if @characters
        format.json { render :json => @characters }
      end
    end
  end
end
