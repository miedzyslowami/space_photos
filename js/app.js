$(function() {
  //API from NASA
  var apiKey = 'https://api.nasa.gov/planetary/apod?api_key=AEKxjgrTBwxWZZIBqcGoLa11luawFJG2d3xdOPDe&date=';
var randomDay=Math.floor((Math.random() * 30) + 1);
  var date = '2017-05-'+randomDay; //Date in YYYY-MM-DD format
  var images_url = apiKey + date;


  var galleryMarsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=AEKxjgrTBwxWZZIBqcGoLa11luawFJG2d3xdOPDe';
  var gallery = $('.gallery');


  function generateRandomDate(start, end) {
      return new Date(start + Math.random() * (end - start));
  }


  function insertBackgroundImage(object) {
    $('.welcome_text').css('background-image', 'url(' + object.hdurl + ')');

  }

  function loadImage() {

    $.ajax({
      url: images_url,
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      insertBackgroundImage(response);
    }).fail(function(error) {});

  }

  function insertImage(object) {
    var image = Object.values(object);
    for (var i = 0; i < 6; i++) {
      var imageUrl = image[i].img_src;
      var date = 'Earth-date: ' + image[i].earth_date;
      var newImage = $('<li>');
      newImage.text(date);
      newImage.css('background-image', 'url(' + imageUrl + ')');
      gallery.append(newImage);
    }

  }

  function loadGallery() {
    $.ajax({
      url: galleryMarsUrl,
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      insertImage(response.photos);
    }).fail(function(error) {});
  }

  function loadMore() {
    $('.load_more').on('click', function() {
      loadGallery();
    })
  }

  loadImage();
  loadGallery();
  loadMore();
});
