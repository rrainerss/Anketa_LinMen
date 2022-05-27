//Allows inputs to work as checkboxes
$(".FormSection input:checkbox").on('click', function()
{
    var $box = $(this);
    if($box.is(":checked"))
    {
        var group = ".FormSection input:checkbox[name='" + $box.attr("name") + "']";
        $(group).prop("checked", false);
        $(group).attr("data-checked", false);
        $box.prop("checked", true);
        $box.attr("data-checked", true);
    }
    else
    {
        $box.prop("checked", false);
        $box.attr("data-checked", false);
    }
});


//Checkbox input logic
function Section2(Group, Option, Target)
{
    //check if all 3 variables are passed
    if((Group || Group === 0) && (Option || Option === 0) && (Target || Target === 0))
    {
        //check if clicked checkbox was already checked
        if($("#Group" + Group + "_" + Option).attr('data-checked') == 'false')
        {
            //wasnt checked
            console.log($("[id^='Group" + Group + "']"));

            $("[id^='Group" + Group + "']").each(function(i, InputElement)
            {
                console.log(InputElement);
            });
        }
        else
        {
            //was checked

        }

        //document.getElementById("Group" + Group + "_" + Option).checked = false;


    }
    else
    {
        alert("one of the variables are undefined");
    }

}





function check1()
{
    var i = document.getElementsByClassName('Hidden2')[0].style.display = "none";
    document.getElementById("41").checked = false; document.getElementsByClassName('Hidden5')[0].style.display = "none";
    var o = document.getElementById("44").checked = false;
    document.getElementById("42").checked = false;
    document.getElementById("45").checked = false;
    document.getElementById("46").checked = false;
    document.getElementById("47").checked = false;
    document.getElementById("48").checked = false;
    document.getElementById("49").checked = false;
    document.getElementById("50").checked = false;

    if (document.getElementById('3').checked && document.getElementById('4').checked && document.getElementById('5').checked)
    {
        document.getElementsByClassName('Hidden')[0].style.display = "none";
        document.getElementsByClassName('Hidden3')[0].style.display = "none";
        document.getElementsByClassName('Hidden4')[0].style.display = "none";
    }
    else
    {
        document.getElementsByClassName('Hidden')[0].style.display = "block";
        document.getElementsByClassName('Hidden3')[0].style.display = "none";
        document.getElementsByClassName('Hidden4')[0].style.display = "none";
    }
}
  
    function check2() {
        var i = document.getElementsByClassName('Hidden2')[0].style.display = "none"; document.getElementById("41").checked = false; document.getElementsByClassName('Hidden5')[0].style.display = "none";
        var o = document.getElementById("44").checked = false; document.getElementById("42").checked = false; document.getElementById("45").checked = false; document.getElementById("46").checked = false; document.getElementById("47").checked = false; document.getElementById("48").checked = false; document.getElementById("49").checked = false; document.getElementById("50").checked = false;
        
      if (document.getElementById('3').checked && document.getElementById('4').checked && document.getElementById('5').checked) {
          document.getElementsByClassName('Hidden')[0].style.display = "none";
          document.getElementsByClassName('Hidden3')[0].style.display = "none";
          document.getElementsByClassName('Hidden4')[0].style.display = "none";
          i
          o
      } 
      
      else {
          document.getElementsByClassName('Hidden')[0].style.display = "none";
          document.getElementsByClassName('Hidden3')[0].style.display = "block";
          document.getElementsByClassName('Hidden4')[0].style.display = "none";
          i
          o
      }
    }
  
    function check3() {
        var i = document.getElementsByClassName('Hidden2')[0].style.display = "none"; document.getElementById("41").checked = false; document.getElementsByClassName('Hidden5')[0].style.display = "none";
        var o = document.getElementById("44").checked = false; document.getElementById("42").checked = false; document.getElementById("45").checked = false; document.getElementById("46").checked = false; document.getElementById("47").checked = false; document.getElementById("48").checked = false; document.getElementById("49").checked = false; document.getElementById("50").checked = false;
      if (document.getElementById('3').checked && document.getElementById('4').checked && document.getElementById('5').checked) {
          document.getElementsByClassName('Hidden')[0].style.display = "none";
          document.getElementsByClassName('Hidden3')[0].style.display = "none";
          document.getElementsByClassName('Hidden4')[0].style.display = "none";
          i
          o
      } else {
          document.getElementsByClassName('Hidden')[0].style.display = "none";
          document.getElementsByClassName('Hidden3')[0].style.display = "none";
          document.getElementsByClassName('Hidden4')[0].style.display = "block";
          i
          o
      }
    }

    



    function check4() {
        var x = document.getElementById("43").checked = false; document.getElementById("44").checked = false;
        if (document.getElementById('41').checked) {
            document.getElementsByClassName('Hidden2')[0].style.display = "none";
            x
        } else {
            document.getElementsByClassName('Hidden2')[0].style.display = "block";
        }
      }
    
      function check5() {
        var x = document.getElementById("43").checked = false; document.getElementById("44").checked = false;
        if (document.getElementById('41').checked) {
            document.getElementsByClassName('Hidden2')[0].style.display = "none";
            x
        } else {
            document.getElementsByClassName('Hidden2')[0].style.display = "none";
            x
        }
      }




      function check11() {
        var x = document.getElementById("47").checked = false; document.getElementById("44").checked = false;
        if (document.getElementById('48').checked) {
            document.getElementsByClassName('Hidden5')[0].style.display = "none";
            x
        } else {
            document.getElementsByClassName('Hidden5')[0].style.display = "block";
        }
      }

      function check12() {
        var x = document.getElementById("49").checked = false; document.getElementById("50").checked = false;
        if (document.getElementById('48').checked) {
            document.getElementsByClassName('Hidden5')[0].style.display = "none";
            x
        } else {
            document.getElementsByClassName('Hidden5')[0].style.display = "none";
            x
        }
      }



// sekcija 2





