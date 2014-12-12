// инициализация нашего кода для jquery mobile
$(document).bind("mobileinit", function() {


// перехватываем загрузку страницы новостей
// $("#news").live('pageinit', function(event){
  // console.log(event);
});
  $(document).ready( function() {
  $("#news").on("pageshow", function(){
  if(window.localStorage != undefined) {
      // html5 localStorage доступен! 
      if(window.localStorage.getItem('news')!= undefined && 
          window.localStorage.getItem('news')!= null ) {
          // файл с новостями находится в кеше
          //загружаем новости, что хранятся локально  и проверяем наличие обновлений
          showNews(window.localStorage.getItem('news'));
          $("#news-line").before("<p>проверка обновлений</p>");
       }
       else {
        // хэш локального хранения отсутствует
        $("#news-line").before("<p>загрузка новостей</p>");
       }
    }
    else {
      // интерфейс html5 local storage не поддерживается, каждый раз загружаем новости
      $("#news-line").before("<p>загрузка новостей</p>");  
    }
    loadNewsAjax();
  });

// загрузка страницы с расписание 

 $("#schedule").on("pageshow", function(){
  var number = $('#class option:selected').val();
  checkAvailableLetters(number);
  var letter = $('#letter option:selected').val();
  var grade = parseInt(number) + parseInt(letter);
  var week = $('#weekday option:selected').val();
  week = parseInt(week);
  if(window.localStorage != undefined) {
    // html5 localStorage доступен! 
    if(window.localStorage.getItem('schedule')!= undefined && 
       window.localStorage.getItem('schedule')!= null ) {
      // выводим расписание из локального файла  
      showSchedule(window.localStorage.getItem('schedule'), grade, week);
      $("#schedule-details").before("<p>проверка обновлений</p>");
      }
    else {
      // хэш локального хранения отсутствует
      $("#schedule-details").before("<p>загрузка расписания</p>");
    }
  } else {
      // интерфейс html5 local storage не поддерживается, каждый раз загружаем новости
      $("#schedule-details").before("<p>загрузка расписания</p>");
  }
    
  //$.ajax("http://school80.16mb.com/resource/schedule.json", {
  $.ajax("http://localhost/school/public_html/resource/schedule.json", {
    complete: function(response) {
    
      
    if (window.localStorage != undefined) {
      if (window.localStorage.getItem('schedule') != undefined && 
        window.localStorage.getItem('schedule') != null) {
        if(response.responseText == window.localStorage.getItem('schedule')){
        // загруженная информация расписания совпадает с выведенной на экран
        $('#schedule-details').before("расписание совпадает с локальным - обновлений нет");
        } else {
          // имеются изменения
          $("#schedule-details").before("расписание обнавлено, локальный файл устарел");
          showSchedule(response.responseText, grade, week);
        }
      } else {
      //локальная память доступна, но кэш не обнаружен
      $("#schedule-details").before("расписание обновлено и сохранено локально");
      showSchedule(response.responseText, grade, week);
    }
  }
else {
  //Локальная память отсутствует;
  //показываем информацию без сохранения
  $("#schedule-details").before("расписание обновлено");
  // Расписание обновлено
  showSchedule(response.responseText, grade, week);
}
},
dataType: 'text' ,
error: function() {
  $("#schedule-details").html("невозможно загрузить расписание :(");
  // Невозможно загрузить расписание
}
});


  });
         $('#loginForm1').submit(function() {
         $('#output').html('Connecting....');
         //var postTo = "http://school80.16mb.com/auth.php";
         var postTo = "http://localhost/school/public_html/auth.php";
          $.post(postTo, { login: $('[name=login]').val(), pass: $('[name=pass]').val() },
                 function(data) {
                    if(data != "") {
                        //alert(data);
                        $('body [data-role=page]:last').after(data);
                        $('body').pagecontainer("change",$("#success"));
                    } else {
                       $('#output').html("Could not connect to server");
                    }
                    localStorage.setItem("name", $('[name=login]').val());
                   var name = localStorage.getItem('name');
                 });

             return false;
         });
         
   // реагирует на изменение на странице расписания - выбор класса/ буквы/ день недели
   $("#schedule").on("change", "#class", function() {
      checkAvailableLetters($(this).val());
   })
   
  });  

function addPages() {
for (var i=1; i<5; i++){
var page = $("<div>").data("role", "page").attr("id","page" + i);
$("<div>").attr("data-role","header").append($("<h1>").html("Page" + i)).appendTo(page);
$("<div>").attr("data-role","content").append($("<р>").html("Contents for page "+ i)).appendTo(page);
$("body").append(page);
$("<li>").append($("<a>").attr("href","#page" +i).html("Go to page" + i)).appendTo("#list");
$("#button1").hide();
}};

function loadNewsAjax() {
//$.ajax("http://school80.16mb.com/lib/news.php");  
$.ajax("http://localhost/school/public_html/lib/news.php");
//Получаем JSОN-объект в текстовом виде для упрощения его хранения
//в локальной памяти
//$.ajax("http://school80.16mb.com/resource/news.json", {
$.ajax("http://localhost/school/public_html/resource/news.json", {
complete: function(response) {
  if (window.localStorage != undefined) {
    if (window.localStorage.getItem('news') != undefined && 
        window.localStorage.getItem('news') != null) {
      if(response.responseText == window.localStorage.getItem('news')){
        // загруженная информация новостей совпадает с выведенной на экран
        $('#news-line').before("<p>новости обновлены</p>");
      } else {
          // имеются изменения
          $("#news-line").before("<p>новости обновлены</p>");
          showNews(response.responseText);
        }
    } else {
      //локальная память доступна, но кэш не обнаружен
      $("#news-line").before("<p>новости обновлены</p>");
      showNews(response.responseText);
    }
  }
else {
  //Локальная память отсутствует;
  //показываем информацию без сохранения
  $("#news-line").before("<p>новости обновлены</p>");
  // Расписание обновлено
  showNews(response.responseText);
}
},
dataType: 'text' ,
error: function() {
  $("#news-line").before("<p>новости обновлены</p>");
  // Невозможно загрузить новости
}
});
}
var isFirstLoad = true;
function showNews (thenew) {
  if (window.JSON != undefined) {
    news = JSON.parse(thenew);
  } else {
    news = eval("(" + thenew + ")");
  }
  if (window.localStorage != undefined) {
    // Сохранить новые данные в виде строки
    window.localStorage.setItem("news", thenew);
  }
  var html = "";
  var i;
  if (news.article){
    for ( i=0; ((i < 2) && (i < news.article.length)); i++) {
      // формируем html код для вывода новостей
      html += '<div id="new'+news.article[i].id+'"><h2>' + 
          news.article[i].title + '</h2><p>'+ news.article[i].content + '</p>\
          <p>'+news.article[i].date+' <p id="like'+news.article[i].id+'">'+news.article[i].likes+' </p><a href="javascript:addLike('+news.article[i].id+','+news.article[i].likes+' );" id ="addLike'+news.article[i].id+'" data-icon="star" data-iconpos="notext">+1</a>\
          </p><hr></div>';
      
    }
      // кнопка для показа новостей более старых
    if (news.article[i]) {
      html += '<a href="javascript:moreNews('+i+');" id = "moreNews">Показать еще</a>';
    } 
  }
  else {
    html = '<p>'+news.none+'</p>'
  }
  
  $("#news-line").html('');
  $("#news-line").html(html);
}  
;
// функция формирует таблицу расписания

function showSchedule (timetable, grade, week) {
  alert(grade +' '+ week);
  if (window.JSON != undefined) {
    schedule = JSON.parse(timetable);
  } else {
    schedule = eval("(" + timetable + ")");
  }
  if (window.localStorage != undefined) {
    // Сохранить новые данные в виде строки
    window.localStorage.setItem("schedule", timetable);
  }
  var html = "";
  //weekdays[0] - массив понедельника, lessons[i] - урок №1, [0] - 5a класс
  
  //var lessons = schedule.timetable.weekdays[0].lessons[i][0];
 
   html += '<sections id = "timetable" class = "ui-grid-b" >';
  for (var i = 0; i < schedule.timetable.weekdays[week].lessons.length; i++) {
      // цикл расписания уроков от 1 до последнего для 5а класса
      if (schedule.timetable.weekdays[week].lessons[i][grade].discipline != ''){
      html += '<span class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:20px">' + (i+1) +
         '</div></span>';
      html += '<span class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:20px">' + schedule.timetable.weekdays[week].lessons[i][grade].discipline +
         '</div></span>';
      html += '<span class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:20px">' + schedule.timetable.weekdays[week].lessons[i][grade].placement +
         '</div></span>';
    }
  }
      // Это обычная информация о заседаниях
      html += '</sections>';
    
    
    $("#schedule-details").html(html);

}

function moreNews(index) {
  if (window.localStorage != undefined) {
    if (window.localStorage.getItem('news')!= undefined && 
          window.localStorage.getItem('news')!= null ) {
      if (window.JSON != undefined) {
        extraNews = JSON.parse(window.localStorage.getItem('news'));
        } else {
          extraNews = eval("(" + window.localStorage.getItem('news') + ")");
        }
        var html = "";
        var i = index;
        if (news.article) {
          for ( i = index; ((i < index+2) && (i < news.article.length)); i++) {
            // формируем html код для вывода новостей
            html += '<div id="new'+news.article[i].id+'"><h2>' + 
                  news.article[i].title + '</h2><p>'+ news.article[i].content + '</p>\
                  <p>'+news.article[i].date+' <p id="like'+news.article[i].id+'">'+news.article[i].likes+' </p>\
                  <a href="javascript:addLike('+news.article[i].id+','+news.article[i].likes+' );"\
                  id ="addLike'+news.article[i].id+'" data-icon="star" data-iconpos="notext">+1</a>\
                  </p><hr></div>';
          }
          // кнопка для показа новостей более старых
          if (news.article[i]) {
            html += '<a href="javascript:moreNews('+i+');" id = "moreNews">Показать еще</a>';
          } 
          } else {
            html = '<p>'+news.none+'</p>';
          }
       $("#moreNews").remove();   
       $("#news-line div:last").after(html);
  } 
}
  else {
    $("#news-line p:last").after('Ошибка загрузки.');
  }
}

function addLike(id, likes) {
 // $.ajax("http://school80.16mb.com/lib/news.php", {
  $.ajax("http://localhost/school/public_html/lib/news.php", {
    data: {
      id: id,
      target: 'like'
         }
    }
  );
  var count = likes + 1;
  $('#like'+id).html(count);
  $('#addLike'+id).before('<p>Вам понравилось</p>');
  $('#addLike'+id).remove();
}

function checkAvailableLetters(grade) {
  $('select#letter #g, #v').show();
  switch(grade) {
    case '0':
    case '15':
      $('select#letter #g').hide();
      break;
    case '18':
    case '20':
      $('select#letter #g, #v').hide();
      break;
  }
  return true;
}