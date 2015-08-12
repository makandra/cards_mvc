module ApiActions

  def render_errors(record)
    render json: { errors: record.errors }, status: :unprocessable_entity
  end

end
