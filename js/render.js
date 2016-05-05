// Земи JSON и претвори го во објекти
$.get("json/dizajni.json").then(function (data) {
    var dizajni = data['dizajni'];
    var vkupno_dizajni = data['dizajni'].length;
    var zaslugi_distinct = {};
    var vkupno_zaslugi = [];

    // Издвој ги само различните имиња на автор(к)ите
    $(dizajni).each(function () {
        var ime_prezime = this.zasluga;

        if (!(ime_prezime in zaslugi_distinct)) {
            zaslugi_distinct[ime_prezime] = 1;
            vkupno_zaslugi.push(ime_prezime);
        }
    });

    // Прикажи вкупен број на различни дизајни
    $('.vkupno-dizajni').html(vkupno_dizajni);

    // Прикажи вкупен број на различни заслуги
    $('.vkupno-zaslugi').html(vkupno_zaslugi.length);

    console.log(vkupno_zaslugi);

    // Рандомизирај листа на дизајни
    // http://stackoverflow.com/a/18650169/3190066
    dizajni.sort(function () {
        return 0.4 - Math.random();
    });

    // Изгенерирај DOM елементи
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
                "<h2>" + this.zasluga + "</h2>" +
                "</div>");
        thumb_el.insertBefore('.pechatnici');
    });
});
