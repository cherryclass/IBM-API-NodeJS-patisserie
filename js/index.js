//var myUrl = "https://ibm-api-slim-patisserie.eu-de.mybluemix.net/";

$( document ).ready(function() {
$('#btn-insert-gateau').click(function(){ 
var id=$('#id').val();
var nom=$('#nom').val();
$.ajax({ 
      type: "POST",
      crossDomain: true,
      contentType: 'application/json; charset=utf-8',
      url: "/gateau?id="+id+"&nom="+nom,
     success: function(data){
          //gateau modifié
         alert("gateau enregistré");
      }
 });
});
$('#btn-get-gateau').click(function(){ 
    var idx=$('#idx').val();
      $.ajax({ 
      crossDomain: true,
      type: "GET",
      url: "/gateau/"+idx,
      success: function(data){ 

       	$("#result").html(data);
      }
    });
  });
	
	

$('#btn-get-gateaux').click(function(){ 
      $('#table-gateau').bootstrapTable({
            url: "/gateaux",
            columns: [{
                field: 'id',
                title: 'Item ID'
            }, {
                field: 'nom',
                title: 'Item Name'
            },]
        });

      /*$.ajax({ 
      type: "GET",
      url: myUrl+"gateaux",
      success: function(data){  
        $("#result2").html(data);
        
      }
    });*/
  });
 }); 
