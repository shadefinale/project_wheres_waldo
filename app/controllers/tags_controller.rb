class TagsController < ApplicationController
  def create
    @tag = Tag.new(whitelist_tag_params)
  end

  # def index
  #   @tags = Tags.all.reject{|tag| tag.characlength == 0}

  private
    def whitelist_tag_params
      params.require(:tag).permit(:character_id, :xoffset, :yoffset)
    end
end
