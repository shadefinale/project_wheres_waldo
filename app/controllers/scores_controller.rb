class ScoresController < ApplicationController
  def create
    @score = Score.new(whitelist_score_params)
    respond_to do |format|
      if @score.save
        @scores = Score.all
        format.json { render :json => @scores }
      end
    end

  end

  private
    def whitelist_score_params
      params.require(:score).permit(:name, :score)
    end
end
