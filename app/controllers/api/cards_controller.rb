class Api::CardsController < ApplicationController

  def show
    load_card
  end

  def create
    build_card
    if @card.save
      render :show
    else
      render_errors(@card)
    end
  end


  private

  def load_card
    @card = Card.find(params[:id])
  end

  def build_card
    @card = Card.new
    @card.attributes = params[:card].permit(:title, :body)
  end


end
