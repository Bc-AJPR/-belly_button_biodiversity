// Read samples.json data 
d3.json("data/samples.json").then((data1)=> {
    //console.log(data)
    
    // Assign the data to the dropdwown menu nad fill data
    let droplist = d3.select("#selDataset");
    data1.names.forEach(function(subject) {droplist
        .append("option").text(subject)
        .property("value")
    });
    
    //functions to display the data and the plots to the page
    getPlots(data1.names[0]);
    getData(data1.names[0]);
    });
      
    //change event function
    function optionChanged(id) {
        getPlots(id)
        getData(id)
    };
    
    //plot the graphs
    function getPlots(id) {
        // Get the data from the JSON file
        d3.json("data/samples.json").then((data2)=> {
            //console.log(data2)
            // Get the metadata info for wref
            let metadata = data2.metadata;
            //console.log(metadata)
            //wfreq meta data info by id
            let wfreq = metadata.filter(meta => meta.id.toString() === id)[0].wfreq;
            //console.log(wfreq)
            // Filter values by ID 
            let samples = data2.samples.filter(s => s.id.toString() === id)[0];
            // Get the top 10 values 
            let samples_10 = samples.sample_values.slice(0, 10).reverse();
            console.log(samples_10)
            // get the otu id's to the desired form for the plot
            let OTU_id = (samples.otu_ids.slice(0, 10)).reverse().map(d => "OTU" + d);
            //console.log(OTU_id)
            // get the top 10 labels for the plot
            let labels_10 = samples.otu_labels.slice(0, 10);

            //bar data
            let bar_trace = {
                x: samples_10,
                y: OTU_id,
                text: labels_10,
                marker: {color: '#D0F9DB'},
                type:"bar",
                orientation: "h",
                };
            let bar_data = [bar_trace];
            //bar layout
            let bar_layout = {
                title: "Top 10 OTU",
                yaxis:{tickmode:"auto"
                },
                margin: {
                    l: 75,
                    r: 75,
                    t: 75,
                    b: 0
                }
            };
            //bar plot
            Plotly.newPlot("my_bar", bar_data, bar_layout);
      
            
            //bubble data
            let b_trace = {
                x: samples.otu_ids,
                y: samples.sample_values,
                mode: "markers",
                marker: {
                    size: samples.sample_values,
                    color: samples.otu_ids,
                    colorscale: "Earth"
                },
                text: samples.otu_labels
            };
            //bubble layout
            let b_layout = {
                xaxis:{title: "OTU ID"},
                yaxis:{title: "Germ Count in Sample"},
                title:{text:"Germ Types & Volumes Found"},
                height: 700,
                width: 1100
            };
            let b_data = [b_trace];
            //bubble plot
            Plotly.newPlot("my_bubble", b_data, b_layout); 
            
            
            //guage data
            let g_data = [
                {
                  domain: { x: [0, 2], y: [0, 10] },
                  value: parseFloat(wfreq),
                  title: { text: "Weekly Washing Frequency"},
                  type: "indicator",
                  mode: "gauge+number",
                  gauge: {
                        axis: { range: [null, 9],
                        showticklabels: true,
                        ticklabelstep: 1,
                        tickmode: "linear"
                         },
                    steps: [
                      { range: [0, 1], color: 'rgba(77, 77, 168, 0.2)' },
                      { range: [1, 2], color: 'rgba(77, 77, 168, 0.3)' },
                      { range: [2, 3], color: 'rgba(77, 77, 168, 0.4)' },
                      { range: [3, 4], color: 'rgba(77, 77, 168, 0.5)' },
                      { range: [4, 5], color: 'rgba(77, 77, 168, 0.6)' },
                      { range: [5, 6], color: 'rgba(77, 77, 168, 0.7)' },
                      { range: [6, 7], color: 'rgba(77, 77, 168, 0.8)' },
                      { range: [7, 8], color: 'rgba(77, 77, 168, 0.9)' },
                      { range: [8, 9], color: 'rgba(77, 77, 168, 1)' },
                       ],
                    hoverinfo: 'labels',
                    hole: 0.5,
                    type: 'pie',
                    borderwidth: 1.5,
                    bordercolor: "black",
                    bar:{color: "#AD8F71", thickness: 0.4}
                    }
                }
              ];
            //guage layout
            let g_layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
            //gauge plot
            Plotly.newPlot('my_guage', g_data, g_layout);
        });
    };
     
    // Create the function to get the necessary data
    function getData(id) {
        d3.json("data/samples.json").then((data3)=> {
            
            // Get the metadata info for the demographic panel
            let metadata = data3.metadata;
    
            // Filter meta data info by id
            let result = metadata.filter(meta => meta.id.toString() === id)[0];
    
            // Select demographic panel to put data
            let Info_dem = d3.select("#panel"); 

            // Purge the demographic info panel each time new selection
            Info_dem.html("");
            
            // Grab the demographic id and add the info to the panel
            Object.entries(result).forEach((key) => {   
                    Info_dem.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    };

    