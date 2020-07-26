$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Main-chat__message-list__message-box">
          <div class="Main-chat__message-list__message-box__info">
            <div class="Main-chat__message-list__message-box__info__user-name">
              ${message.user_name}
            </div>
            <div class="Main-chat__message-list__message-box__info__message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="Main-chat__message-list__message-box__message">
            <p class="Main-chat__message-list__message-box__message__content">
              ${message.content}
            </p>
            <img class="Main-chat__message-list__message-box__message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Main-chat__message-list__message-box">
        <div class="Main-chat__message-list__message-box__info">
          <div class="Main-chat__message-list__message-box__info__user-name">
            ${message.user_name}
          </div>
          <div class="Main-chat__message-list__message-box__info__message-date">
            ${message.created_at}
          </div>
        </div>
        <div class="Main-chat__message-list__message-box__message">
          <p class="Main-chat__message-list__message-box__message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Main-chat__message-form__input-box').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.Main-chat__message-list').animate({ scrollTop: $('.Main-chat__message-list')[0].scrollHeight});
      $('.Main-chat__message-form__input-box__send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});