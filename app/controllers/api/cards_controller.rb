class Api::CardsController < ApplicationController

  include ApiActions

  before_filter :require_sign_in, only: [:create, :update, :destroy]


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

  def destroy
    load_card
    @card.destroy!
    render nothing: true
  end


  private

  def load_card
    @card = Card.find(params[:id])
  end

  def load_cards
    @cards = Card.
      search(params[:query]).
      order(created_at: :desc).
      paginate(page: params[:page]).
      per_page(10).
      all
  end

  def build_card
    @card ||= Card.new
    @card.attributes = params[:card].permit(:title, :body)
  end

  def require_sign_in
    unless signed_in
      render nothing: true, status: :unauthorized
    end
  end


end
