const buildHTML = (XHR) => {
      // レスポンスプロパティでレスポンスで届いたデータが確認できる  XMLHttpRequestオブジェクトのプロパティの一つ
      const item = XHR.response.post;
      // HTMLに入れ込む要素を作成
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
  return html;
};

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
    //onloadはリクエストが成功した時に呼び出される XMLHttpRequestオブジェクトのプロパティの一つ
    XHR.onload = () => {
      // レスポンスに問題があったときの処理
      // ステータスが200以外だったら何らかの通信エラー
      if (XHR.status != 200) {
        // アラートでステータスコードと通信エラーに関するテキストを表示
        // ダブルクォーテーションでもシングルクォーテーションでもない！
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // jsの処理から強制的に抜ける
        return null;
      };

      // jsで作ったhtmlを入れ込む元要素
      const list = document.getElementById("list");
      // list要素の後ろにbuildHTMLで作成したhtmlを配置 (引数はbuildHTMLで使用する非同期通信オブジェクト)
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // メモを入力するフォーム要素を取得
      const formText = document.getElementById("content");
      // 入力スペースの値を空に変更
      formText.value = "";
    };
  });


};
// turboは非同期のいろんなことをしてるもの
window.addEventListener('turbo:load', post);

