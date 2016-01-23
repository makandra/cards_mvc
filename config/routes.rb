Rails.application.routes.draw do

  namespace :api, defaults: { format: 'json' } do

    resources :cards

    resource :session, only: [:create, :destroy]

  end

  namespace :angular do

    root to: 'frontend#show'

  end

  namespace :ember do

    root to: 'frontend#show'

  end

  namespace :react do

    root to: 'frontend#show'

  end

  namespace :riot do

    root to: 'frontend#show'

  end

  namespace :ng2 do

    root to: 'frontend#show'

  end

  root to: redirect('/angular')

  get ':directory/*path', to: 'templates#show', directory: /angular|ng2|riot|shared/


end
