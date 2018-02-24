var html = document.getElementById('display');
     
        
        function getJSON(url) {
            var resp;
            var xmlHttp;

            resp = '';
            xmlHttp = new XMLHttpRequest();

            if (xmlHttp !== null) {
                xmlHttp.open("GET", url, false);
                xmlHttp.send();
                resp = xmlHttp.responseText;
            }

            return resp;
        }
   
    // display the results of the users choice
    function navChoice(choice) {

        html.innerHTML = '';
        var json = getJSON('https://swapi.co/api/'+choice+'/');
        var parsed = JSON.parse(json);
        var statement = "";
        //console.log(parsed);
        
        for (var i=0; i < parsed.results.length; i++){
            //console.log(choice);
            if (choice == 'films') {
            statement += '<div class="col-lg-3 item"><a id="' + parsed.results[i].url +'"href="#" onclick="moreInfo(this.id);">' + parsed.results[i].title + '</a></div>';
            }//end if
            else  {
            console.log(parsed.results[i].name);
            statement += '<div class="col-lg-3 item"><a id="' + parsed.results[i].url + '" href="#" onclick="moreInfo(this.id);">' + parsed.results[i].name + '</a></div>';          
                }//end else
            }//end for

          // access additional pages of info 
          for(var z = 0; z < (parsed.count/10); z++){  
            if(parsed.next) {
                        console.log(parsed.next);
                        json = getJSON(parsed.next);
                        parsed = JSON.parse(json); 
                            for (var i=0; i < parsed.results.length; i++){ 
                                statement += '<div class="col-lg-3 item"><a id="' + parsed.results[i].url + '" href="#" onclick="moreInfo(this.id);">' + parsed.results[i].name + '</a></div>';  
                            }
                        }
                    }
        html.innerHTML = statement;  
    } 

    // Display info when the user clicks a result 
    function moreInfo(url){
        console.log(url); 
        var json = getJSON(url); 
        var parsed = JSON.parse(json);

        if(parsed.opening_crawl) { 
        html.innerHTML = '<h3 style="color:#FFE81F; margin-bottom:0;">Episode '+parsed.episode_id+'</h3><h2 style="color:#FFE81F; margin-top:0;">' + parsed.title + '</h2><p style="color:#FFE81F; margin:10px 200px; font-size:130%; padding-bottom:30px;">' + parsed.opening_crawl + '</p>'; } 
    
        if(parsed.height) {
            alert(parsed.name);
        }

        if(parsed.hyperdrive_rating) {
            html.innerHTML = '<h2 style="color:#FFE81F;">' + parsed.name + '</h2> <p>hyperdrive rating: ' + parsed.hyperdrive_rating + '</p>';
        }

        if(parsed.designation) {
            alert('Race: ' + parsed.name + '\nClassification: ' + parsed.classification + '\nDesignation: ' + parsed.designation);
        }

    }  
