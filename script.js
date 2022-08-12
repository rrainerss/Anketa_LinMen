//////////////////////////////
//Allows inputs to work as checkboxes, changes appearance
    $(".CheckboxDiv input:checkbox").on('click', function()
    {
        var $box = $(this);
        if($box.is(":checked"))
        {
            var group = ".CheckboxDiv input:checkbox[name='" + $box.attr("name") + "']";
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
        $(document).trigger('data-attribute-changed');
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
//Hide images on load
    $(document).ready(function()
    {
        $(".OverlayImage:not(.BaseImage)").each(function(i, Image)
        {
            Image.style.display = 'none';
        });
    });

//////////////////////////////
//Called on checkbox click
    function InputLogic(ClickedElementObject)
    {
        //get DOM element of clicked checkbox from the given Jquery object
        var ClickedElementDom = ClickedElementObject[0];

        //get number attribute of clicked element 
        var ClickedElementNumber = ClickedElementDom.getAttribute("data-desc");

        //get checked attribute 
        var ClickedElementChecked = ClickedElementDom.getAttribute("data-checked");

        //flip (and convert to bool) the checked attribute of checkbox to represent new value
        (ClickedElementChecked == 'true') ? ClickedElementChecked = false : ClickedElementChecked = true;

        //get all checkboxes from the same level
        var ClickedElementSiblings = ClickedElementObject.parent().parent().find(".CheckboxDiv > input");

        //if checkbox was just checked
        if(ClickedElementChecked == true)
        {
            ClickedElementDom.setAttribute("data-checked", true);
            ClickedElementDom.checked = true;
            ClickedElementDom.parentNode.style.backgroundColor = 'var(--mediumgrayblue)';
            ClickedElementDom.parentNode.style.borderColor = 'var(--mediumgrayblue)';
            ClickedElementDom.parentNode.getElementsByTagName("p")[0].style.color = 'white';
            ClickedElementDom.parentNode.getElementsByTagName("p")[0].style.textShadow = '0px 0px 1px rgb(255, 255, 255) !important';

            CheckElement(ClickedElementNumber, ClickedElementSiblings);
        }
        //if checkbox was just unchecked
        else if(ClickedElementChecked == false)
        {
            ClickedElementDom.setAttribute("data-checked", false);
            ClickedElementDom.checked = false;
            ClickedElementDom.parentNode.style.backgroundColor = 'white';
            ClickedElementDom.parentNode.style.borderColor = 'var(--lightgrayblue)';
            ClickedElementDom.parentNode.getElementsByTagName("p")[0].style.color = 'var(--lightgrayblue)';
            ClickedElementDom.parentNode.getElementsByTagName("p")[0].style.textShadow = '0px 0px 0px rgb(255, 255, 255) !important';

            UncheckElement(ClickedElementNumber, ClickedElementSiblings);
        }
    }

//////////////////////////////
//Called if checkbox wasnt already checked
    function CheckElement(ClickedElementNumber, ClickedElementSiblings)
    {
        //for unchecking siblings
        ClickedElementSiblings.each(function(i, Sibling)
        {
            if(Sibling.getAttribute("data-desc") != ClickedElementNumber)
            {
                if(Sibling.getAttribute("data-checked") == 'true')
                {
                    var SiblingElementNumber = Sibling.getAttribute("data-desc");

                    var SiblingImage = Sibling.getAttribute("data-images");

                    if($("." + SiblingImage).length)
                    {
                        $("." + SiblingImage).each(function(i, Element)
                        {
                            Element.style.display = 'none';
                        });
                    }

                    $("[data-desc^='" + SiblingElementNumber + "']").each(function(i, Descendant)
                    {
                        Descendant.setAttribute("data-checked", false);
                        Descendant.checked = false;
                        Descendant.parentNode.style.backgroundColor = 'white';

                        //only change these for checkboxes, not text inputs
                        if(Descendant.getAttribute("type") != "text")
                        {
                            Descendant.parentNode.getElementsByTagName("p")[0].style.color = 'var(--lightgrayblue)';
                            Descendant.parentNode.getElementsByTagName("p")[0].style.textShadow = '0px 0px 0px rgb(255, 255, 255) !important';
                        }

                        Descendant.parentNode.style.borderColor = 'var(--lightgrayblue)';

                        var DescendantElementNumber = Descendant.getAttribute("data-desc");

                        var DescendantImageAttr = Descendant.getAttribute("data-images");

                        if(DescendantImageAttr != null)
                        {
                            $("." + DescendantImageAttr).each(function(i, Element)
                            {
                                Element.style.display = 'none';
                            });
                        }

                        if(DescendantElementNumber.length > ClickedElementNumber.length)
                        {
                            Descendant.parentNode.parentNode.style.display = 'none';
                        }
                    });
                }
            }
        });

        //for showing checked descendant
        var DescendantLevel = ClickedElementNumber.replace(/[^0-9]/g, '').length;

        var ClickedElementImageAttr = $("[data-desc='" + ClickedElementNumber + "'")[0].getAttribute("data-images");

        if($("." + ClickedElementImageAttr).length)
        {
            $("." + ClickedElementImageAttr).each(function(i, Element)
            {
                Element.style.display = 'block';
            });
        }

        $("[data-desc^='" + ClickedElementNumber + "']").each(function(i, Descendant)
        {
            if(Descendant.getAttribute("data-desc").replace(/[^0-9]/g, '').length == (DescendantLevel + 1))
            {
                Descendant.parentNode.parentNode.style.display = 'block';
            }
        });
    }

//////////////////////////////
//Called if checkbox was already checked
    function UncheckElement(ClickedElementNumber, ClickedElementSiblings)
    {
        $("[data-desc^='" + ClickedElementNumber + "']").each(function(i, Descendant)
        {
            Descendant.setAttribute("data-checked", false);
            Descendant.checked = false;
            Descendant.parentNode.style.backgroundColor = 'white';
            Descendant.parentNode.style.borderColor = 'var(--lightgrayblue)';
            Descendant.parentNode.getElementsByTagName("p")[0].style.color = 'var(--lightgrayblue)';
            Descendant.parentNode.getElementsByTagName("p")[0].style.textShadow = '0px 0px 0px rgb(255, 255, 255) !important';

            var DescendantLevel = Descendant.getAttribute("data-desc").replace(/[^0-9]/g, '').length;

            if(DescendantLevel > ClickedElementNumber.replace(/[^0-9]/g, '').length)
            {
                Descendant.parentNode.parentNode.style.display = 'none';
            }

            var DescendantImageAttributes = Descendant.getAttribute("data-images");

            if(DescendantImageAttributes != null)
            {
                $("." + DescendantImageAttributes).each(function(i, Element)
                {
                    Element.style.display = 'none';
                });
            }
        });
    }

    function CheckExtra()
    {
        if($("input[data-desc='4.1']").attr("data-checked") == 'true')
        {
            $("input[data-desc='4.1.1']").click();
            $("input[data-desc='4.1.1.0']").click();
        }
    }




/*
    function InputLogic2(ClickedElementObject)
    {
        //get DOM element of clicked checkbox from the given Jquery object
        var ClickedElementDom = ClickedElementObject[0];
        
        //get checked attribute 
        var ClickedElementChecked = ClickedElementDom.getAttribute("data-checked");

        //get descendant number attribute 
        var ClickedElementNumber = ClickedElementDom.getAttribute("data-desc");

        //flip (and convert to bool) the checked attribute of checkbox to represent new value
        (ClickedElementChecked == 'true') ? ClickedElementChecked = false : ClickedElementChecked = true;

        //if checkbox is now checked
        if(ClickedElementChecked == true)
        {
            //get all checkboxes from the same level
            var ClickedElementSiblings = ClickedElementObject.parent().parent().find(".CheckboxDiv > input");

            //for each of the checkboxes
            ClickedElementSiblings.each(function(i, Sibling)
            {
                //get descendant number attribute of other same level checkboxes
                SiblingElementNumber = Sibling.getAttribute("data-desc");

                //get checked attribute of other same level checkboxes
                SiblingElementChecked = Sibling.getAttribute("data-checked");

                //if the numbers differs from the clicked checkbox descendant number (excludes it from the array)
                if(ClickedElementNumber != SiblingElementNumber)
                {
                    //if the element is checked
                    if(SiblingElementChecked == 'true')
                    {
                        //matches all elements that start with same attribute (all should be descendants or parents of clicked checkbox)
                        $("[data-desc^='" + SiblingElementNumber + "']").each(function(i, Descendant)
                        {
                            //uncheck each element
                            Descendant.setAttribute("data-checked", false);
                            Descendant.checked = false;
                            Descendant.parentNode.style.backgroundColor = 'white';
                            Descendant.parentNode.style.color = 'black';

                            //hide the descendentant button containers
                            if(SiblingElementNumber.length > ClickedElementNumber.length)
                            {
                                Descendant.parentNode.parentNode.style.display = "none";
                            }
                        });
                    }
                }
            });
        }

        //if checkbox is now unchecked
        else if(ClickedElementChecked == false)
        {
            
        }

    }


*/


    /*$(document).on('data-attribute-changed', function()
    {
        var AttrValue = $('.CheckboxDiv').parent().prev().attr("data-checked");
        console.log('Data changed to: ' + AttrValue);
    });

    $(".CheckboxDiv").click(function()
    {
        InputDomElement = $(this).parent().prev()[0];
        console.log(InputDomElement);



        //$(".CheckboxDiv").each(function(i, CheckboxDiv)
        //{   
        //    if(CheckboxDiv)
        //    {
        //        console.log(CheckboxDiv);
        //    }
        //}); 
    });*/





//////////////////////////////
//Checkbox input logic
/*
    function InputLogic1(ClickedElement)
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
                                $(document).trigger('data-attribute-changed');
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
                    $(document).trigger('data-attribute-changed');
                }
            });
        }
    }


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
        $(document).trigger('data-attribute-changed');
    });


    //attr, display or hide
    function DisplayImage1(ButtonAttrs, CheckValue)
    {
        //console.log("----");
        //console.log(ButtonAttrs);
        //console.log(CheckValue);
        //console.log("----");
        //iegūst atribūtu no pogas un darbību ar pogu (hide/show)
        //veic darbību ar klasēm no atribūta

        $("." + ButtonAttrs).each(function(i, ImageClassElement)
        {
            console.log(ImageClassElement);
            if(CheckValue == 'true')
            {
                ImageClassElement.style.display = 'block';
            }
            else if(CheckValue == 'false')
            {
                ImageClassElement.style.display = 'none';
            }
        });
    }

*/

/*


    $(".CheckboxDivaaaaaa").click(function()
    {
        console.log($(this)[0]);

        $(".CheckboxDiv").each(function(i, CheckboxDiv)
        {   
            if(CheckboxDiv)
            {
                console.log(CheckboxDiv);
            }
        }); 
    });



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


