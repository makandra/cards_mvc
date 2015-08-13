Rails.application.routes.draw do

  namespace :api, defaults: { format: 'json' } do

    resources :cards, only: [:index, :show, :create, :update]

  end

  namespace :angular do

    root to: 'frontend#show'

  end

  root to: redirect('/angular')

  get ':directory/*path', to: 'templates#show', directory: /angular|shared/


end
