class PostsController < ApplicationController
  responders :nobrainer_sse
  respond_to :html, :sse, only: [:index]
  respond_to :json, only: [:create]

  def index
    respond_with posts, include_original: true
  end

  def create
    Post.create! post_params
    render json: { message: 'Post created' }, status: 201
  end

  private

  def posts
    Post.all
  end

  def post_params
    params.require(:post).permit(:title, :text)
  end
end
