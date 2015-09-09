class CharactersController < ApplicationController
  def index
    @characters = Character.all.reject{ |character| character.tags.count != 0 }
    respond_to do |format|
      if @characters
        format.json { render :json => @characters }
      end
    end
  end
end
