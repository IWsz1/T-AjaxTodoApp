class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    # Post.create(content: params[:content])
    # redirect_to action: :index

    # contentにparamsのcontentキーの中に入った情報を格納してレコードを作成
    # 作成したレコードをpostに代入
    post = Post.create(content: params[:content])
    # postというキーにレコードのデータを入れてjsonで返す
    render json:{ post: post }
  end
end
