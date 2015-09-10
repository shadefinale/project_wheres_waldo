class Game < ActiveRecord::Base

  has_many :tags


  def score
    return 600 - (Time.now - self.created_at)
  end

  def game_over?
    return score < 0
  end
end
