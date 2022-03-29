// Read samples.json data 
d3.json("data/samples.json").then((data1)=> {
    //    console.log(data)
    
    // Assign the data to the dropdwown menu
    data1.names.forEach(function(subject) {droplist
        .append("option").text(subject)
        .property("value");
    });
    
    // Call the functions to display the data and the plots to the page
    getPlots(data1.names[0]);
    getData(data1.names[0]);
    });
       
    // Fill dropdown data
    let droplist = d3.select("#selDataset");
    
    // Create the change event function
    function optionChanged(id) {
        getPlots(id);
        getData(id);
    }
    
    //  Plot the graphs
    function getPlots(id) {
       
       
        // Get the data from the JSON file
        d3.json("data/samples.json").then((data)=> {
            console.log(data)
            // Get the metadata info for wref
            let metadata = data.metadata;
    
            // Filter meta data info by id
            let result = metadata.filter(meta => meta.id.toString() === id)[0];
            
            // Assign wfreq
            let wfreq = result.wfreq;
                console.log(wfreq)
            // Filter values by ID 
            let samples = data.samples.filter(s => s.id.toString() === id)[0];
            
            // Get the top 10 values 
            let samplevalues = samples.sample_values.slice(0, 10).reverse();
      
            // Geth the top 10 OUT IDs.  
            let OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
            
            // get the otu id's to the desired form for the plot
            let OTU_id = OTU_top.map(d => "OTU " + d)
      
             
            // get the top 10 labels for the plot
           let labels = samples.otu_labels.slice(0, 10);
      
          //   console.log(`Sample Values: ${samplevalues}`)
          //   console.log(`Id Values: ${OTU_top}`)
            // create trace variable for the plot
            let trace = {
                x: samplevalues,
                y: OTU_id,
                text: labels,
                marker: {color: 'rgb(223,240,216)'},
                type:"bar",
                orientation: "h",
            };
      
            // create data variable
            let bar_data = [trace];
      
            // create layout variable to set plots layout
            let bar_layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 75,
                    r: 75,
                    t: 75,
                    b: 0
    
                }
            };
      
            // create the bar plot
            Plotly.newPlot("bar", bar_data, bar_layout);
      
            //console.log(`ID: ${samples.otu_ids}`)
          
            // The bubble chart
            let trace1 = {
                x: samples.otu_ids,
                y: samples.sample_values,
                mode: "markers",
                marker: {
                    size: samples.sample_values,
                    color: samples.otu_ids
                },
                text: samples.otu_labels
      
            };
      
            // set the layout for the bubble plot
           let bubble_layout = {
                xaxis:{title: "OTU ID"},
                yaxis:{title: "Germ Count in Sample"},
                title:{text:"Germ Types & Volumes Found"},
                height: 700,
                width: 1100
            };
      
            // creating data variable 
            let bubble_data = [trace1];
      
            // create the bubble plot
            Plotly.newPlot("bubble", bubble_data, bubble_layout); 
      
            // The guage chart
            var data1 = [
                {
                  domain: { x: [0, 2], y: [0, 10] },
                  value: parseFloat(wfreq),
                  title: { text: "Weekly Washing Frequency" },
                  type: "indicator",
                  mode: "gauge+number",
                  // delta: { reference: 100 },
                  gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                      { range: [0, 1], color: 'rgba(255, 0, 0, 0.2)' },
                      { range: [1, 2], color: 'rgba(255, 0, 0, 0.3)' },
                      { range: [2, 3], color: 'rgba(255, 0, 0, 0.4)' },
                      { range: [3, 4], color: 'rgba(255, 0, 0, 0.5)' },
                      { range: [4, 5], color: 'rgba(255, 0, 0, 0.6)' },
                      { range: [5, 6], color: 'rgba(255, 0, 0, 0.7)' },
                      { range: [6, 7], color: 'rgba(255, 0, 0, 0.8)' },
                      { range: [7, 8], color: 'rgba(255, 0, 0, 0.9)' },
                      { range: [8, 9], color: 'rgba(255, 0, 0, 1)' }
                    ],
                    labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
                    hoverinfo: 'label',
                    hole: 0.5,
                    type: 'pie',
                    showlegend: false,
                    }
                }
              ];
              var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
              Plotly.newPlot('myDiv', data1, layout);
      
          });
      } 
      
    
    // Create the function to get the necessary data
    function getData(id) {
        d3.json("data/samples.json").then((data)=> {
            
            // Get the metadata info for the demographic panel
            let metadata = data.metadata;
    
            // Filter meta data info by id
            let result = metadata.filter(meta => meta.id.toString() === id)[0];
    
            // Select demographic panel to put data
            let demographicInfo = d3.select("#sample-metadata");
            
            // Purge the demographic info panel each time new selection
            demographicInfo.html("");
    
            // Grab the demographic id and add the info to the panel
            Object.entries(result).forEach((key) => {   
                    demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    
    // Create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getData(id);
    }

    