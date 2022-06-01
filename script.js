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
//Descendant check
    function DescendantCheck(Group)
    {
        $("[id^='Group" + Group + "_']").each(function(element)
        {
            if($(this).attr("data-target"))
            {
                var SelectedTarget = document.getElementsByClassName($(this).attr("data-target"))[0];
                SelectedTarget.style.display = "none";
                
                if(SelectedTarget.querySelector("input").hasAttribute("data-target"))
                {
                    console.log(SelectedTarget.querySelector("input"));
                    DescendantOfTarget = SelectedTarget.querySelector("input").getAttribute("data-target");
                    document.querySelector("." + DescendantOfTarget).style.display = "none";
                }
            }
        });
    }

//////////////////////////////
//Checkbox input logic
    function InputLogic2(Group, Option, Target)
    {
        //console.log("Group, option, target: " + Group, Option, Target);

        //check if all 3 variables are passed (checkbox has descendants)
        if((Group || Group === 0) && (Option || Option === 0) && Target)
        {
            //check if clicked checkbox was already checked
            //wasnt checked, then if runs
            if($("#Group" + Group + "_" + Option).attr("data-checked") == 'false')
            {
                
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
            //was checked, then else runs
            else
            {             
                DescendantCheck(Group);
            }
        }
        //not all 3 variables are passed, checkbox doesnt have descendants
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


    function InputLogic(ClickedElement)
    {        
        var ClickedInput = ClickedElement.parent().prev();

        //console.log(ClickedElement);

        //if This WAS NOT CHECKED
        if(ClickedInput.is(":checked") == false)
        {
            //gets attribute
            var InputAttr = ClickedInput.attr("data-desc");
            
            //counts how many numbers it contains (determines level inside the button tree)
            var AttrNumCount = InputAttr.replace(/[^0-9]/g, '').length;
    
            //matches all elements that start with same attribute (all should be descendants or parents of clicked checkbox)
            $("[data-desc^='" + InputAttr + "']").each(function(i, Descendant)
            {
                //gets attribute of each element
                DescAttr = Descendant.getAttribute("data-desc");

                //counts how many numbers it contains
                DescAttrNumCount = DescAttr.replace(/[^0-9]/g, '').length;

                if(DescAttrNumCount == (AttrNumCount + 1))
                {
                    $("[data-desc='" + DescAttr + "']").each(function(i, MatchingElement)
                    {
                        MatchingElement.parentNode.style.display = "block";
                    });
                }
            });

        }

        //if This WAS CHECKED
        else if(ClickedInput.is(":checked") == true)
        {
            //gets attribute
            var InputAttr = ClickedInput.attr("data-desc");
            
            //counts how many numbers it contains (determines level inside the button tree)
            var AttrNumCount = InputAttr.replace(/[^0-9]/g, '').length;
    
            //matches all elements that start with same attribute (all should be descendants or parents of clicked checkbox)
            $("[data-desc^='" + InputAttr + "']").each(function(i, Descendant)
            {
                if(InputAttr != Descendant.getAttribute("data-desc"))
                {
                    Descendant.parentNode.style.display = "none";
                    Descendant.setAttribute("data-checked", false);
                    Descendant.checked = false;
                }
            });
        }


    }