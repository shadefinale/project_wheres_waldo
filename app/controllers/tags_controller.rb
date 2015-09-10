class TagsController < ApplicationController
  before_action :find_or_create_game
  before_action :check_game_over 
  
  def create
    @tag = Tag.new(whitelist_tag_params)
    @tag.game = @game

    respond_to do |format|
      if @tag.save
        format.json { render :json => @tag }
      end
    end
  end

  def destroy
    @tag = Tag.find(params[:id])

    respond_to do |format|
      if @tag.destroy
        format.json { render :json => @tag}
      end
    end
  end

  def index
    # If there's a session ID, load tags from that game
    # If there's not, set the session ID, create a new game with that session id
    @tags = Tag.includes(:character).where(game_id: @game.id)

    respond_to do |format|
      format.json { render :json => @tags.to_json(include: :character) }
    end
  end

  private
    def whitelist_tag_params
      params.require(:tag).permit(:character_id, :xoffset, :yoffset)
    end
end
