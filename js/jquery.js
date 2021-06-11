//Bouton Animations et Stop
/*$(function(){
    //Bouton Animation1
    $("#confirm-command").click(function(){
        $('<a HREF="mailto:san@antonio.net"></a>').appendTo('#valid-command');
        var mailto_link = "mailto:san@antonio.net";
        var win = window.open(mailto_link,"emailWindow");
        console.log("yes");
    });

});






//Bouton Animations et Stop
$(function(){
    $("#start").click(function(){
        var myVar = $("#myInput").val();
        var myStyle = $("#exo3").attr("style");
        console.log(myVar);
        console.log(myStyle);

        $("#p21").text("Voilà mon nouveau texte");
        $("#p22").html("Voilà mon <b>nouveau</b> texte");
        $("#myInput").val("Nouvelle valeur");
    });

    $("#start2").click(function(){
        $("#exo3").append("<p>Mon nouveau paragraphe en fin(append)</p>");
        $("#exo3").prepend("<p>Mon nouveau paragraphe en début(prepend)</p>");
        $("#exo3").after("<p>Mon nouveau paragraphe après ma div(after)</p>");
        $("#exo3").before("<p>Mon nouveau paragraphe après ma div(before)</p>");
    });

    $("#start3").click(function(){
        $("#p21").remove();
        $("#p22").empty();
    });
});

//Exo 3 - CSS et JQuery
$(function(){
    $("#but1").click(function(){
        $("#p31").toggleClass("red");
    });

    $("#but2").click(function(){
        $("#p31").css("color", "green");
        console.log($("#p31").css("color"));
    });

    $("#but3").click(function(){
        $("#p32").css({
            "color": "green",
            "font-weight": "bold",
            "background-color" : "yellow"
        });

        console.log($("#but1").width());
        $("#but2").width(150);

    });
});

//Exo 4 - CSS et JQuery
$(function(){
    $("#bexo41").click(function(){
        $("#p41").css("border-color", "green");
        $("#p42").parent().css("border-color", "blue");
    //    $("#p42").parents().css("border-color", "orange");
    //    $("#p41").parents(".special").css("border-color", "blue");
    //    $("#main").children().css("border-color", "yellow");
    //    $("#main").find("p").css("border-color", "yellow");
    //    $("#p44").siblings().css("border-color", "blue");
    //    $("#p44").next().css("border-color", "blue");
    //    $("p").last().css("border-color", "blue");
    //    $("p").eq(2).css("border-color", "blue");
    });

    $("#bexo42").click(function(){
        $("p").filter(".special").css("border-color", "purple");
        $("p").not(".special").css("border-color", "brown");
    });
});


//Exo 5 - Demo Ajax
$(function(){
    $("#ajaxexo").click(function(){
        $("#demoajax").load("demoajax.txt");

    });

});



*/