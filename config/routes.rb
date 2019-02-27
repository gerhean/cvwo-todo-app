Rails.application.routes.draw do 
  root to: 'home#index'
  namespace :api do 
		namespace :v1 do 
			get '/todo/filterbytag/:filterByTag/:tagName', to: 'todos#show'
			resources :todos, only: [:index, :create, :destroy, :update] 
			resources :tags, only: [:index, :create]
			resources :todo_tags, only: [:index]
    end 
  end 
end

