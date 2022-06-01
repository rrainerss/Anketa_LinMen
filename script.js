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
    function InputLogic(ClickedElement)
    {        
        var ClickedInput = ClickedElement.parent().prev();

        //if This WAS NOT CHECKED
        if(ClickedInput.is(":checked") == false)
        {
            //get the main group element
            var GroupElement = ClickedInput.parent();

            //for each element in the same level as the clicked button
            GroupElement.children().each(function(i, MatchingElement)
            {
                //if the element is an input
                if(MatchingElement.nodeName == "INPUT")
                {
                    var MatchingElementChecked = MatchingElement.getAttribute("data-checked");

                    if(MatchingElementChecked == "true")
                    {
                        //gets attribute value of the matching element
                        var MatchingElementAttr = MatchingElement.getAttribute("data-desc");
                        
                        //counts how many numbers it contains (determines level inside the button tree)
                        var AttrNumCount = MatchingElementAttr.replace(/[^0-9]/g, '').length;

                        //matches all elements that start with same attribute (all should be descendants or parents of clicked checkbox)
                        $("[data-desc^='" + MatchingElementAttr + "']").each(function(i, Descendant)
                        {
                            if(MatchingElementAttr != Descendant.getAttribute("data-desc"))
                            {
                                Descendant.parentNode.style.display = "none";
                                Descendant.setAttribute("data-checked", false);
                                Descendant.checked = false;
                            }
                        });
                    }
                }
            });

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