require 'json_sse'
class PostsController < ApplicationController
  include ActionController::Live

  def index
    @posts = Post.all
  end

  def create
    post = Post.new(params[:post])
    if post.valid?
      render json: post
    else
      render json: { errors: post.errors }
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    head :no_content
  end

  def stream
    if request.headers['Accept'] == 'text/event-stream'
      begin
        response.headers['Content-Type'] = 'text/event-stream'

        sse = JsonSSE.new(response.stream)

        posts = RethinkDB::RQL.new.table( Post.table_name )
        posts.changes.run(NoBrainer.connection.raw).each do |change|
          sse.write(change['new_val'])
        end

      rescue *client_disconnected

      ensure
        sse.close rescue nil
        NoBrainer.disconnect rescue nil
      end
    end
  end

  private

  def client_disconnected
    return ActionController::Live::ClientDisconnected, IOError
  end
end
