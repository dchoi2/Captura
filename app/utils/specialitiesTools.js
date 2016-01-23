import React from 'react';
import ReactDOM from 'react-dom';

var SpecTools = (function() {

  var specialitiesDict = {
    "portrait":"Portrait",
    "headshot":"Headshot",
    "events":"Events",
    "engagement":"Engagement",
    "wedding":"Wedding",
    "lifestyle":"Lifestyle/Candid",
    "club":"Club/Nightlife",
    "concert": "Concert/Performance",
    "commercial":"Commercial",
    "arch":"Real Estate",
    "sports":"Sports",
    "nature":"Nature"
  }

  var data = [
    {id: "portrait", selected: false},
    {id: "headshot", selected:false},
    {id: "events", selected:false},
    {id: "engagement", selected:false},
    {id: "wedding", selected:false},
    {id: "lifestyle", selected:false},
    {id: "club", selected:false},
    {id: "concert", selected:false},
    {id: "commercial", selected:false},
    {id: "arch", selected:false},
    {id: "sports", selected:false},
    {id: "nature", selected:false}
  ]

  return {
    getCheckBoxes: function(updatedData, cb) {
      var checks = updatedData.map(function(d) {
        var WORDS = specialitiesDict[d.id]
        return(
          <div>
          <input key={d.id+'input'} id={d.id} checked={d.selected} type="checkbox" onChange={cb(d.id)}/><label key={d.id+'label'} htmlFor={d.id}>{WORDS}</label><br/>
          </div>
        )
      })
      return checks
    },
    idToString: specialitiesDict,
    initCheckedState: data
  }
})();

export default SpecTools