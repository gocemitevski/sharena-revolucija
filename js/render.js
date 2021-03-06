var default_select_value = $('.btn-group-designers').val();

$(document).ready(function () {

// Земи JSON и претвори го во објекти
  $.get("json/dizajni.json").then(function (data) {
    var dizajni = data['dizajni'];
    var vkupno_dizajni = data['dizajni'].length;
    var zaslugi_distinct = {};
    var zaslugi_iminja = [];

    // Издвој ги само различните имиња на автор(к)ите
    // http://stackoverflow.com/a/17781071/3190066
    $(dizajni).each(function () {
      var ime_prezime = this.zasluga;

      if (!(ime_prezime in zaslugi_distinct)) {
        zaslugi_distinct[ime_prezime] = 1;
        zaslugi_iminja.push(ime_prezime);
      }
    });

    // Подреди ги имињата на заслугите по азбучен ред
    zaslugi_iminja.sort();

    // Прикажи вкупен број на различни дизајни
    $('.vkupno-dizajni').html(vkupno_dizajni);

    // Прикажи вкупен број на различни заслуги
    $('.vkupno-zaslugi').html(zaslugi_iminja.length);

    // Рандомизирај листа на дизајни
    // http://stackoverflow.com/a/18650169/3190066
    dizajni.sort(function () {
      return 0.4 - Math.random();
    });

    // Изгенерирај елементи на DOM
    $(dizajni).each(function () {

      // Провери дали има посебно назначено име за thumbnail. Ако нема, земи го името на изворниот фајл за печатење.
      if (this.hasOwnProperty('ime_png') === true) {
        var img_png = this.ime_png;
      } else {
        var img_png = this.ime;
      }

      var thumb_el = $(
              "<div class='dizajn-wrap'>" +
              "<a href='img/" + this.ime + "." + this.file_ext + "'>" +
              "<img class='dizajn-thumb img-responsive' alt='" + this.ime + "' src='img/" + img_png + "-300w.png'>" +
              "</a>" +
              "<h2 class='zasluga-title'>" + this.zasluga + "</h2>" +
              "</div>");
      thumb_el.insertBefore('.pechatnici');

    });

    // Додај ги имињата на дизајнер(ки)те во <select>
    $(zaslugi_iminja).each(function (index, value) {
      $('.btn-group-designers').append('<option class="opt-designer">' + value + '</option>');
    });

    // Провери дали е назначен хеш, па ако не е назначи го основниот
    if (window.location.hash.length < 1 || window.location.hash === default_select_value) {
      window.location.hash = '/';
    } else {
      select_designer_from_hash(default_select_value);
      load_designs_from_hash($('.dizajn-wrap'), $('.btn-group-designers').val(), default_select_value);
    }

    // Филтрирај го прикажувањето на дизајните соодветно на направениот избор и врати ја видливоста на сите,
    // во случај да е избрана опцијата за приказ на сите дизајни
    $('.btn-group-designers').change(function (event) {

      load_designs_from_hash($('.dizajn-wrap'), $(this).val(), default_select_value);

      // Реформулирај хеш за приказ во URL
      update_hash($(this).val(), default_select_value);

      // Отстрани го фокусот од <select> за да биде појасно што се случува
      $(this).blur();
    });
  });
});

$(window).on('load hashchange', select_designer_from_hash(default_select_value));

// Го менува хешот соодветно
function update_hash(current_hash, default_hash) {
  // Реформулирај хеш за приказ во URL
  if (current_hash !== default_hash) {
    window.location.hash = '/' + current_hash.replace(/\s/g, "-") + '/';
  } else {
    window.location.hash = '/';
  }
}

// Проверува дали е назначен дизајнер во хеш и го избира од листата соодветно
function select_designer_from_hash(default_select_value) {
  // Претвори хеш во име и презиме
  var designer_hash = decodeURIComponent(window.location.hash.substr(2).replace(/-/g, " ").replace(/\s{2,}/g, " - ")).replace(/\//g, "");

  console.log(designer_hash);

  // Автоматски избери соодветна вредност од <select> освен кога се вчитува адресата без хеш
  if (designer_hash && designer_hash !== default_select_value) {
    $('.btn-group-designers').val(designer_hash).change();
  } else {
    window.location.hash = '/';
  }
}

// Ги крие или покажува дизајните според направениот избор
function load_designs_from_hash(dizajn_wrap, select_value, default_select_value) {

  dizajn_wrap.each(function () {

    if (select_value !== default_select_value) {
      if ($(this).text() !== select_value) {
        $(this).addClass('hidden');
      } else {
        $(this).removeClass('hidden');
      }
    } else {
      $(this).removeClass('hidden');
    }
  });
}