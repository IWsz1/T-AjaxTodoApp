function post (){
  const form = document.getElementById("form");
  // 第二引数のeでイベント発生時の情報を持った物（これもデフォルトのオブジェクト）
  form.addEventListener("submit", (e) => {
    // railsとしてデフォルトで行っているsubmitが押されたらサーバーへ同期通信でリクエストを行う処理をjsの処理と重複してしまうため無効化する
    e.preventDefault();
    // FormDataオブジェクトを使用することで引数のformで入力されたデータを変数に代入できる
    const formData = new FormData(form);
    // XMLHttpRequestオブジェクトを使用することで非同期通信ができるオブジェクトを生成できる
    const XHR = new XMLHttpRequest();
    // openメソッドを使用することでリクエストの内容を指定できる
    // 第一引数にhttpメソッド、第二引数にパス、第三引数に非同期通信であるかをtrueない場合はfalseを指定する
    XHR.open("POST", "/posts", true);
    // レスポンスを受ける際のデータフォーマットの指定
    XHR.responseType = "json";
    // XHRを用いてFormDataをリクエストとして送信
    XHR.send(formData);
  });


  console.log("イベント発火");
};

window.addEventListener('turbo:load', post);