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
        //gets the actual input of the clicked button
        var ClickedInput = ClickedElement.parent().prev();

        //gets the starting number of current level images
        if(ClickedElement.attr("data-images"))
        {
            var ImageNumber = ClickedElement[0].getAttribute("data-images").match(/\d+/)[0];
        }

        //WHEN USER CHECKS AN OPTION
        //if the input was not checked
        if(ClickedInput.is(":checked") == false)
        {

            if(ClickedElement.attr("data-images"))
            {
                //for each image that contains the starting number of current level images
                $('[class*="' + ImageNumber + '_"]').each(function(i, SameLevelImage)
                {
                    //hides each image
                    SameLevelImage.style.display = 'none';
                });

                //gets image classes from the currently clicked/checked button
                var ImagesToDisplay = ClickedElement[0].getAttribute("data-images");

                //splits string into seperate class names
                var SplitImageClasses = ImagesToDisplay.split('&');

                //for each element of the class
                for(i = 0; i < SplitImageClasses.length; i++)
                {
                    //displays each image
                    $("." + SplitImageClasses[i])[0].style.display = 'block';
                }
            }

            //get the parent of the clicked input
            var GroupElement = ClickedInput.parent();

            //FOR UNCHECKING OTHER ELEMENTS/DESCENDANTS WHEN CHECKED
            //for each element in the same level as the clicked input (other options of same level)
            GroupElement.children().each(function(i, MatchingElement)
            {
                //if the element is an input
                if(MatchingElement.nodeName == "INPUT")
                {
                    //assign its checked value to a variable
                    var MatchingElementChecked = MatchingElement.getAttribute("data-checked");

                    //if attribute data-checked is true
                    if(MatchingElementChecked == "true")
                    {
                        //gets level/value of the matching element's attribute
                        var MatchingElementAttr = MatchingElement.getAttribute("data-desc");

                        //matches all elements that start with same attribute (all should be descendants or parents of clicked checkbox)
                        $("[data-desc^='" + MatchingElementAttr + "']").each(function(i, Descendant)
                        {
                            //if element is on the same level/is a descendant and isnt the same clicked element
                            if(MatchingElementAttr != Descendant.getAttribute("data-desc"))
                            {
                                //uncheck each element
                                Descendant.parentNode.style.display = "none";
                                Descendant.setAttribute("data-checked", false);
                                Descendant.checked = false;
                            }
                        });
                    }
                }
            });

            //gets level/value attribute of the clicked button
            var InputAttr = ClickedInput.attr("data-desc");
            
            //counts how many numbers it contains (determines level inside the button tree)
            var AttrNumCount = InputAttr.replace(/[^0-9]/g, '').length;
    
            //FOR SHOWING DESCENDANTS WHEN CHECKED
            //matches all elements that start with same level/value (all should be descendants or parents of clicked checkbox)
            $("[data-desc^='" + InputAttr + "']").each(function(i, Descendant)
            {
                //gets level/value attribute of each element
                DescAttr = Descendant.getAttribute("data-desc");

                //counts how many numbers it contains
                DescAttrNumCount = DescAttr.replace(/[^0-9]/g, '').length;

                //if it is a descendant of the clicked button (higher number count)
                if(DescAttrNumCount == (AttrNumCount + 1))
                {
                    //
                    $("[data-desc='" + DescAttr + "']").each(function(i, MatchingElement)
                    {
                        //
                        MatchingElement.parentNode.style.display = "block";
                    });
                }
            });
        }

        //WHEN USER UNCHECKS AN OPTION
        else if(ClickedInput.is(":checked") == true)
        {
            //gets level/value attribute of the clicked button
            var InputAttr = ClickedInput.attr("data-desc");
            
            //counts how many numbers it contains (determines level inside the button tree)
            var AttrNumCount = InputAttr.replace(/[^0-9]/g, '').length;
    
            //matches all elements that start with same attribute (all should be descendants or parents of clicked checkbox)
            $("[data-desc^='" + InputAttr + "']").each(function(i, Descendant)
            {
                //if element is on the same level/is a descendant and isnt the same clicked element
                if(InputAttr != Descendant.getAttribute("data-desc"))
                {
                    //uncheck each element
                    Descendant.parentNode.style.display = "none";
                    Descendant.setAttribute("data-checked", false);
                    Descendant.checked = false;
                }
            });
            
            if(ClickedElement.attr("data-images"))
            {
                //gets image classes from the currently clicked/checked button
                var ImagesToDisplay = ClickedElement[0].getAttribute("data-images");

                //splits string into seperate class names
                var SplitImageClasses = ImagesToDisplay.split('&');
                
                //for each element of the class
                for(i = 0; i < SplitImageClasses.length; i++)
                {
                    //hides each image
                    $("." + SplitImageClasses[i])[0].style.display = 'none';
                }
            }
        }
    }

    $(document).ready(function()
    {
        $(".OverlayImage").each(function(i, Image)
        {
            Image.style.display = 'none';
        });
    });





/*
    $(".CheckboxDiv").click(function()
    {
        console.log($(this));

        var CheckboxImageAttr = $(this)[0].getAttribute("data-images");

        DisplayImage();

        var CheckedAttr = $(this).parent().prev()[0].getAttribute("data-checked");

        if(CheckedAttr == 'true')
        {
            CheckedAttr = 'false';
        }
        else
        {
            CheckedAttr = 'true';
        }
        
        var SplitImageClass = CheckboxImageAttr.split('&');

        for(i = 0; i < SplitImageClass.length; i++)
        {
            if(CheckedAttr == 'true')
            {
                $("." + SplitImageClass[i])[0].style.display = 'block';
                console.log('set to block');
            }
            else if(CheckedAttr == 'false')
            {
                $("." + SplitImageClass[i])[0].style.display = 'none';
                console.log('set to none');
            }
        }
    });*/

    function DisplayImage()
    {
        //iegūst ciparu no rādāmajiem attēliem
        //paslēpj visus ar to pašu ciparu
        //parāda visus rādāmos
    }
