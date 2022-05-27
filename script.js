//////////////////////////////
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

//////////////////////////////
//Hide subsections on load
    $( document ).ready(function()
    {
        $(".FormSubsection").each(function()
        {
            this.style.display = "none";
        });

    });

//////////////////////////////
//Checkbox input logic
    function InputLogic(Group, Option, Target)
    {
        console.log(Group, Option, Target);

        //check if all 3 variables are passed
        if((Group || Group === 0) && (Option || Option === 0) && Target)
        {
            //check if clicked checkbox was already checked
            if($("#Group" + Group + "_" + Option).attr("data-checked") == 'false')
            {
                //wasnt checked
                $("[id^='Group" + Group + "']").each(function()
                {
                    var GroupTargets = $(this).attr("data-target");
                    if($(this).attr("data-target"))
                    {
                        document.getElementsByClassName(GroupTargets)[0].style.display = "none";
                        document.getElementsByClassName(Target)[0].style.display = "block";
                    }
                });
            }
            else
            {
                //was checked
                $("[id^='Group" + Group + "']").each(function()
                {
                    if($(this).attr("data-target"))
                    {
                        var GroupTargets = $(this).attr("data-target");
                        document.getElementsByClassName(GroupTargets)[0].style.display = "none";
                    }
                });
            }
        }
        //not all 3 variables are passed
        else
        {
            $("[id^='Group" + Group + "']").each(function()
            {
                if($(this).attr("data-target"))
                {
                    var GroupTargets = $(this).attr("data-target");
                    document.getElementsByClassName(GroupTargets)[0].style.display = "none";
                }
            });
        }
    }