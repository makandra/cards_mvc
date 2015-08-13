json.cards do
  json.array! @cards, partial: 'show', as: :card
end

meta!(json, paginate: @cards)
