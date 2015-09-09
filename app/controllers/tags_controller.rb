class TagsController < ApplicationController
  def create
    @tag = Tag.new(whitelist_tag_params)

    respond_to do |format|
      if @tag.save
        format.json { render :json => @tag }
      end
    end
  end

  def index
    @tags = Tag.includes(:character)

    respond_to do |format|
      format.json { render :json => @tags.to_json(include: :character) }
    end
  end

  private
    def whitelist_tag_params
      params.require(:tag).permit(:character_id, :xoffset, :yoffset)
    end
end
