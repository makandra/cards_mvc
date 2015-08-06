class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  before_filter do
    cookies['CSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

end
