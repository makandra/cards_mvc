class Api::CardsController < ApplicationController

  include ApiActions


  def show
    load_card
  end

  def index
    load_cards
  end

  def create
    build_card

    if @card.save
      render :show
    else
      render_errors(@card)
    end
  end

  def update
    load_card
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

  def load_cards
    @cards = Card.search(params[:query]).order(created_at: :desc).all
  end

  def build_card
    @card ||= Card.new
    @card.attributes = params[:card].permit(:title, :body)
  end


end
