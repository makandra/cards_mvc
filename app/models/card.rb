class Card < ActiveRecord::Base

  validates :title, :body, presence: true

end
