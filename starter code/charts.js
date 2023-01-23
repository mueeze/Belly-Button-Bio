function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
//-----------------------------Deliverable 1: Create a Horizontal Bar Chart----------------------------------------------------
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
       var barDiv = document.getElementById("bar");
  
    // 4. Create a variable that filters the samples for the object with the desired sample number.
   
    var resultBarArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
       var resultBar = data.resultBarArray[0];
   
       // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
   var yValue = ['otu_ids'];

    var xValue = ['sample_values'];

    var textlabel = ['otu_lables'];
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = {
      x: data.map(row => row.yValue),
      y: data.map(row => row.xValue),
      text: data.map(row => row.textlabel),
       type: "bar",
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
      },
      orientation: "h",
      type: 'sort',
      target: 'x',
      order: 'ascending'
    };

    // 8. Create the trace for the bar chart. 
    var barData = [yticks
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      x: xValue,
      y: yValue,
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}

//---------------------Deliverable 2: Create a Bubble Chart -------------------------------------------

// Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    
    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
      var bubble = document.getElementById("bubble");
      
      // Create a variable that holds the samples array. 
     
      //var bubbleArray = [];
      // 4. Create a variable that filters the samples for the object with the desired sample number.
     //var resultBubbleArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    ///var resultBubble = resultBubbleArray[0];
   
    // 1. Create the trace for the bubble chart.
    var bubbleTrace = {
       x: [1, 500, 1000, 1500, 2000, 2500, 3000, 3500],
      y: [1, 50, 100, 150, 200, 250, 300, 350],
      //x:[sample_values],
      //y: [otu_ids],
      text: ['940<br>id: 40', '941<br>size: 60', '943<br>size: 380', '944<br>size: 100'],
      mode: 'markers',
      marker: {
        size: [40, 60,  380, 100],
        sizemode: 'area'
      }
    };

    var bubbleData = [bubbleTrace
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      x:'OTU ID',
      showlegend: false,
      height: 600,
      width: 1000
    };

    // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
}
//---------------------------Deliverable 3: Create a Gauge Chart--------------------------------------------------------------

var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: 2,
    title: { text: "Belly Button Washing Fequency", font: { size: 24 } },
    delta: { reference: 8, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "black" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "royalblue" },
        { range: [8, 10], color: "green" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 9
      }
    }
  }
];

var layout = {
  width: 500,
  height: 400,
  margin: { t: 20, r: 50, l: 70, b: 90 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('gauge', data, layout);