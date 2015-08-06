class TemplatesController < ApplicationController

  def show
    render template: "#{params[:directory]}/templates/#{params[:path]}", layout: false
  end

end
