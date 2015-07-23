---
layout: post
title: "wanikani charts"
date: "2015-05-08 20:21"
chart: true
---

<script type="text/javascript">
    // https://developers.google.com/chart/interactive/docs/gallery/annotationchart
    google.load('visualization', '1', {'packages':['annotationchart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawGID);

    function drawGID() {
        var queryString = encodeURIComponent('SELECT A, B, C, D');
        var query = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1Zb61QlJVS81XDmSOOj_eY-Xj098DKNKKxGLSuKL8_Ss/gviz/tq?gid=0&headers=1&tq=' + queryString);
        query.send(handleQueryResponse);
    }

    function handleQueryResponse(response) {
        if (response.isError()) {
            alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }

        var data = response.getDataTable();

        start = new Date();
        start.setDate(start.getDate() - 5);

        var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));
        var options = {
            displayAnnotations: true,
            zoomStartTime: start,
        };
        chart.draw(data, options);
    }
</script>

<div id="chart_div" style="width:400; height:300"></div>
