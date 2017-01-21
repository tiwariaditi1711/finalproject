'use strict';

module.exports = function($scope, $http, $rootScope, $location) 
    {
    	var s_seat,no_of_seat;
  var seatOnload = function(){
  $(document).ready(function(){
    $('#Seatclass').change(function(){
      var sel=$('#Seatclass').find(":selected").text();
      if(sel=="GOLD")
      {

      $('#silver tr>td>div').addClass('grey');
      $('#gold tr>td>div').removeClass('grey');

      }

      if(sel=="SILVER")
      {
        $('#gold tr>td>div').addClass('grey');
        $('#silver tr>td>div').removeClass('grey');
      }

    $('#noofseats').change(function(){
      var no = $('#noofseats').find(":selected").text();
      no_of_seat=document.getElementById("totalst").innerHTML= no;
      //alert(no);
      var countdiv=[];


    $('.floating-box').click(function(){

    if(!$(this).hasClass('grey')||$(this).hasClass('red'))
    {
  //alert($(this).hasClass('grey'));
      if(countdiv.length < no)
      {

        $(this).toggleClass("d1");
        var id=$(this).attr('id');
        var cn=$(this).hasClass('d1');

        if(cn)
            {

                countdiv.push(id);
                  $rootScope.TotalSeat=JSON.stringify(countdiv);
              s_seat= document.getElementById("st").innerHTML=countdiv;
              }

        else{
              var ind=countdiv.indexOf(id);
              countdiv.splice(ind,1);
              $rootScope.TotalSeat=JSON.stringify(countdiv);
            }
  if(sel== "SILVER")
  {
    document.getElementById("amt").innerHTML=countdiv.length*100;
  }
  else
  {
    document.getElementById("amt").innerHTML=countdiv.length*150;
  }

  }
  else {
          alert("Request you to  book only " + no +" seats");
    }
  }
  });


  });
  });

  });
};
seatOnload();


$scope.nextPage=function(){
$rootScope.Amount=document.getElementById("amt").innerHTML;
$rootScope.TotalSeat1= s_seat;
$rootScope.coutSeat=no_of_seat;
//$rootScope.movie=$rootscope.Moviename;
var s_no=parseInt(document.getElementById("totalst").innerHTML);
var count=0;
$(".d1").each(function(){
  count++;
});
if(count==s_no)
{
  $location.path('/payment');
}

else{
  alert('ERROR : please select '+s_no+' seats');
}

};






var init=function()
{
  var m=$rootScope.Moviename;
  var t=$rootScope.TheatreName;
  var s=$rootScope.showTime;
  var d=$rootScope.rootDate;

  $http.get('/seats/bookedseats/'+m+'/'+t+'/'+s).success(function (response) {
    for(i=0;i<response.length;i++)
    {
      for(j=0;j<response[i].seat_no.length;j++)
      {
          $('#'+response[i].seat_no[j]).addClass('red');
      }
    }
  });
};

init();

};

