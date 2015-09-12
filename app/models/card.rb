class Card < ActiveRecord::Base

  serialize :extra_pages

  validates :title, :body, presence: true


  def extra_pages=(pages)
    if pages.is_a?(Hash)
      super(pages.values)
    else
      super(pages)
    end
  end

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
