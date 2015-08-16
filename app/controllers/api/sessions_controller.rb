class Api::SessionsController < ApplicationController

  def create
    session[:signed_in] = true
    render nothing: true
  end

  def destroy
    session[:signed_in] = false
    render nothing: true
  end

end
