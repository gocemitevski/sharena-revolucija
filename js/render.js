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
                "<img class='dizajn-thumb img-responsive' alt='" + this.ime + "' src='img/" + img_png + ".png'>" +
                "</a>" +
                "<h2 class='zasluga-title'>" + this.zasluga + "</h2>" +
                "</div>");
        thumb_el.insertBefore('.pechatnici');

    });

    // Додај ги имињата на дизајнер(ки)те во <select>
    $(zaslugi_iminja).each(function (index, value) {
        $('.btn-group-designers').append('<option class="opt-designer">' + value + '</option>');
    });

    // Филтрирај го прикажувањето на дизајните соодветно на направениот избор и врати ја видливоста на сите,
    // во случај да е избрана опцијата за приказ на сите дизајни
    $('.btn-group-designers').change(function (event) {

        var dizajn_wrap = $('.dizajn-wrap');

        dizajn_wrap.each(function () {

            if ($(this).text() !== $('.btn-group-designers option:selected').text()) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
        });

        if ($('.btn-group-designers option:selected').text() === 'Сите автор(к)и') {
            dizajn_wrap.removeClass('hidden');
        }
        
        // Отстрани го фокусот од <select> за да биде појасно што се случува
        $(this).blur();
    });
});
