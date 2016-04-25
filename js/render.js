// Земи JSON и претвори го во објекти
$.get("json/dizajni.json").then(function(data) {
    var dizajni = data['dizajni'];

    // Рандомизирај листа на дизајни
    // http://stackoverflow.com/a/18650169/3190066
    dizajni.sort(function () {
        return 0.4 - Math.random();
    });

    // Изгенерирај DOM елементи
    $(dizajni).each(function() {
        var thumb_el = $(
            "<div class='dizajn-wrap'>" +
                "<a href='img/" + this.ime + "." + this.file_ext + "'>" +
                    "<img class='dizajn-thumb img-responsive' alt='" + this.ime + "' src='img/" + this.ime + ".png'>" +
                "</a>" +
                "<h2>" + this.zasluga + "</h2>" +
            "</div>");
        thumb_el.insertBefore('.pechatnici');
    });
})
