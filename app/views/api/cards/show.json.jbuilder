json.card do
  json.partial! 'show', card: @card
end

meta!(json)
