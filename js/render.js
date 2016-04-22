// Земи JSON и претвори го во објекти
var json_data = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "json/dizajni.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var dizajni = json_data.dizajni;

// Рандомизирај листа на дизајни
// http://stackoverflow.com/a/18650169/3190066
dizajni.sort(function () {
    return 0.4 - Math.random();
});

$(dizajni).each(function () {
    $("<div class='dizajn-wrap'><a href='img/" + this.ime + "." + this.file_ext + "'><img class='dizajn-thumb img-responsive' alt='" + this.ime + "' src='img/" + this.ime + ".png'></a><h2>" + this.zasluga + "</h2></div>").insertBefore('.pechatnici');
});