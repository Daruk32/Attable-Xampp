/* En Jquery 3.4.1
    <!-- formulaire de recherche mais sans bouton search -->
    <!-- Src: https://stackoverflow.com/questions/59422422/how-to-implement-search-functionality-in-bootstrap-card-group-cards/59422818#59422818 -->
*/
$(".filter").on("keyup", function() {
    var input = $(this).val().toUpperCase();
  
    $(".item").each(function() {
      if ($(this).data("string").toUpperCase().indexOf(input) < 0) {
        $(this).hide();
      } else {
        $(this).show();
      }
    })
  });