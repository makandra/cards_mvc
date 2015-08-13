class Card < ActiveRecord::Base

  validates :title, :body, presence: true


  def self.search(query)
    if query.blank?
      all
    else
      where('body LIKE :match OR title LIKE :match', match: "%#{query}%")
    end
  end

end
