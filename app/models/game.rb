class Game < ActiveRecord::Base
  has_secure_token
  has_many :tags
end
