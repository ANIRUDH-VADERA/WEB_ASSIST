chrome.runtime.onMessage.addListener(gotMessage);


function gotMessage(message,sender,sendResponse)
{
    var everything = document.getElementsByTagName('*');
    var fill_color=message.fill_col;
    var border_color=message.bor_col;
    console.log(fill_color);
    console.log(border_color);
    let url = "https://api.wordnik.com/v4/word.json/"+message.txt+"/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=1000&api_key="+'7dxhaih5u3p2igx97sv22v1a2q3vi0w931t0adoxbosh5dfo0';
    fetch(url)
      .then(res=>{
        return res.json();
      })
      .then(data=>{
        var words_list = [message.txt];
        if (data[0] && message.rel==1){
          words_list = words_list.concat(data[0].words);
        }
        return words_list;
      })
      .then(words_list=>{
        for(var j = 0;j < everything.length; j++)
        {
          let string = everything[j].style.cssText;
          string  = string.replace("border: 5px solid rgb(255, 0, 0); background-color: rgb(255, 215, 0); z-index: 100;","")
          everything[j].style.cssText=string;
        }
        return words_list;
      })
      .then(words_list=>{
        for(var k = 0;k < words_list.length; k++)
        {
            for(var l = 0;l < everything.length; l++)
            {
              var temp = words_list[k].toLowerCase();
              if(temp.length>2 && message.lvl<5){
                if(everything[l].getAttribute('href'))
                {
                  if((everything[l].getAttribute('title')))
                  {
                    if((everything[l].getAttribute('title')).toLowerCase().match(temp)==(temp)){
                      everything[l].style.cssText="";
                      everything[l].scrollIntoView(true);
                    }
                  }
                  if(message.lvl>1 && (everything[l].getAttribute('aria-label')))
                  {                  
                    if((everything[l].getAttribute('aria-label')).toLowerCase().match(temp)==(temp)){
                      everything[l].style.cssText="border: 5px solid "+border_color+"; background-color: "+fill_color+"; z-index: 100;";
                      everything[l].scrollIntoView(true);
                    }
                  }
                  if(message.lvl>2 && everything[l].innerHTML)
                    {
                      if((everything[l].innerHTML).toLowerCase().match(temp)==(temp)){
                        everything[l].style.cssText="border: 5px solid "+border_color+"; background-color: "+fill_color+"; z-index: 100;";
                        everything[l].scrollIntoView(true);
                      }
                    }
                  if(message.lvl>3 && everything[l].getAttribute('href'))
                  {                  
                    if((everything[l].getAttribute('href')).toLowerCase().match(temp)==(temp)){
                      everything[l].style.cssText="border: 5px solid "+border_color+"; background-color: "+fill_color+"; z-index: 100;";
                      everything[l].scrollIntoView(true);
                    }
                  }
                  
                }  
              }
              else{
                if((everything[l].getAttribute('title')))
                {
                  if((everything[l].getAttribute('title')).toLowerCase().match(temp)==(temp)){
                    everything[l].style.cssText="border: 5px solid "+border_color+"; background-color: "+fill_color+"; z-index: 100;";
                    everything[l].scrollIntoView(true);
                  }
                }
                if(everything[l].getAttribute('aria-label'))
                {                  
                  if((everything[l].getAttribute('aria-label')).toLowerCase().match(temp)==(temp)){
                    everything[l].style.cssText="border: 5px solid "+border_color+"; background-color: "+fill_color+"; z-index: 100;";
                    everything[l].scrollIntoView(true);
                  }
                }
                if(everything[l].getAttribute('href'))
                {                  
                  if((everything[l].getAttribute('href')).toLowerCase().match(temp)==(temp)){
                    everything[l].style.cssText="border: 5px solid "+border_color+"; background-color: "+fill_color+"; z-index: 100;";
                    everything[l].scrollIntoView(true);
                  }
                }
                
              } 
            }
          }

      })
}

window.addEventListener("mouseup" , selected);

function selected()
{
  let selectedText=window.getSelection().toString().trim();
  if(selectedText.length>0)
  {
    let message={
      text : selectedText
    };
    chrome.runtime.sendMessage(message);
  }
}