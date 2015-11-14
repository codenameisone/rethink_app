require 'json_sse'
class PostsController < ApplicationController
  include ActionController::Live

  def index
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
    else
      @posts = Post.all
    end
  end

  private

  def client_disconnected
    return ActionController::Live::ClientDisconnected, IOError
  end
end
