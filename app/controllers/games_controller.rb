class GamesController < ApplicationController
  before_action :find_or_create_game

  def show
    respond_to do |format|
      format.json {render :json => @game.score}
    end    
  end 

end
