class Card < ActiveRecord::Base

  validates :title, :body, presence: true


  def self.search(query)
    if query.blank?
      all
    else
      where('body LIKE :match OR title LIKE :match', match: "%#{query}%")
    end
  end

  def self.seed
    50.downto(1) do |i|
      Card.create(title: "Card #{i}", body: "Foo bar baz")
    end
  end

end
