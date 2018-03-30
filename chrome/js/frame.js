document.getElementById('GO_button').addEventListener('click', LoadPage);

function LoadPage(){ 
    var objFrame=document.getElementById("myIframe"); 
    objFrame.src=document.getElementById("URL").value;

   }



/*
   document.addEventListener('DOMContentLoaded', function () {
    var c = new ProxyFormController( 'proxyForm' );
  });
  */

