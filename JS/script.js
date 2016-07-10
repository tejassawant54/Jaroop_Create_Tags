$(document).ready(function(){
    
    $('#addTerm').click(function(){     /* -- Onclicking addTerm --*/
        
        var termType = $('#termType').val(),
            termValue = $('#term').val(),
            negTerms = [],
            posTerms = [],
            negTermsLen = 0,
            posTermsLen = 0;
        
        var res = validate(termType,termValue); /* -- Validate the form. Returns boolean value --*/
        
        if(res === true){           /* -- If true create tags as positve or negative depending on the input --*/
        
            $('#term').val('');
            $('#termType').val('');

            if(termType === "Negative"){        /* -- If Type: Negative --*/

                 $('#negativeTags').tagit({     /* -- Intialize tagit plugin with required methods --*/

                    beforeTagAdded: function(evt,ui){
                        var tag = $('#negativeTags').tagit('tagLabel',ui.tag);
                        var color = '#FF0000';
                        ui.tag.css('background',color);
                    },
                    onTagClicked: function(event,ui){
                        $('#term').val(ui.tag.children()[0].text);
                        $('#termType').val('Negative');
                    }
                });

                if($('#negativeTags').children().length === 1){     /* -- Check for the child elements of ul --*/
                    $('#negativeTags').tagit('createTag',termValue);
                }else{
                    negTerms.push(termValue);                   /* -- Push new and old terms to an array --*/
                    $('#negativeTags li').each(function(){      
                        if($(this).children('a')[0]){
                            negTerms.push($(this).children('a')[0].text);

                            negTerms.sort();                    /* -- Sort --*/
                            negTermsLen = negTerms.length;   
                        }   
                    });
                    $('#negativeTags').tagit('removeAll');      /* -- Remove previous tags --*/
    
                    for(var i=0;i<negTermsLen;i++){
                        $('#negativeTags').tagit('createTag',negTerms[i]);  /* -- Create sorted tags --*/
                    }
                }

            }else{      /* -- else Type: Positve --*/

                $('#positiveTags').tagit({      /* -- Intialize tagit plugin with required methods --*/

                    beforeTagAdded: function(evt,ui){
                        var tag = $('#positiveTags').tagit('tagLabel',ui.tag);
                        var color = '#00FF00';
                        ui.tag.css('background',color);
                    },
                    onTagClicked: function(event,ui){
                        $('#term').val(ui.tag.children()[0].text);
                        $('#termType').val('Positive');
                    }

                });

                if($('#positiveTags').children().length === 1){         /* -- Check for the child elements of ul --*/
                    $('#positiveTags').tagit('createTag',termValue);
                }else{
                    posTerms.push(termValue);                           /* -- Push new and old terms to an array --*/
                    $('#positiveTags li').each(function(){
                        if($(this).children('a')[0]){
                            posTerms.push($(this).children('a')[0].text);

                            posTerms.sort();                    /* -- Sort --*/
                            posTermsLen = posTerms.length;   
                        }   
                    });

                    $('#positiveTags').tagit('removeAll');      /* -- Remove previous tags --*/
                    for(var i=0;i<posTermsLen;i++){
                        $('#positiveTags').tagit('createTag',posTerms[i]);      /* -- Create sorted tags --*/
                    }
                    
                } 
                
            } /* -- else positive --*/  
            
        } /* -- boolean ends --*/
        
    }); /* -- click function --*/ 
    
    /**
     * Validate the fields on click
     * @param {string} term - The term to be entered.    
     * @param {string} type - The type of the term entered.
     */
    
    var validate = function(type,val){
        
        if(type === '' && val === ''){          /* -- Check if both fields are empty and return false --*/
            $('.errorMessages').append('<li>TERM : Please fill out this filed.</li>');
            $('.errorMessages').append('<li>TYPE : Please fill out this filed.</li>');
            $('.errorMessages').css('display','block');   
            return false;
        }else if(val === ''){                   /* -- Check if term field is empty and return false --*/
            $('.errorMessages').empty();
            $('.errorMessages').append('<li>TERM : Please fill out this filed.</li>');
            $('.errorMessages').css('display','block');
            return false;
        }else if(type === ''){                  /* -- Check if type field is empty and return false --*/
            $('.errorMessages').empty();
            $('.errorMessages').append('<li>TYPE : Please fill out this filed.</li>');
            $('.errorMessages').css('display','block');
            return false;
        }else{                                 /* -- else return true --*/ 
            $('.errorMessages').css('display','none');
            $('.errorMessages').empty();
            return true;   
        }
        
    }
    
});