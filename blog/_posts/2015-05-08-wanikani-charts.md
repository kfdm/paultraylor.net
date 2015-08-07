---
layout: post
title: "wanikani charts"
date: "2015-05-08 20:21"
chart: true
---

After reading a [post] on the WaniKani forums about using Google docs for graphing study data, I decided to play around with some charts for myself

### Review Queue
<div id="reviews" style="width:100%; height:300px">Loading...</div>

### Progress
<div id="wkProgress" style="width:100%; height:300px">Loading...</div>

[post]: https://www.wanikani.com/chat/api-and-third-party-apps/8270

<script type="text/javascript">
    google.load('visualization', '1', {'packages':['annotationchart', 'corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawGraphs);

    function drawGraphs() {
        var queryString = encodeURIComponent('SELECT A, C, B, D');
        var query = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1Zb61QlJVS81XDmSOOj_eY-Xj098DKNKKxGLSuKL8_Ss/gviz/tq?gid=0&headers=1&tq=' + queryString);
        query.send(function(response) {
            if (response.isError()) {
                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();

            start = new Date();
            start.setDate(start.getDate() - 7);

            var chart = new google.visualization.AnnotationChart(document.getElementById('reviews'));
            var options = {
                displayAnnotations: true,
                zoomStartTime: start,
            };
            chart.draw(data, options);
        });

        queryString = encodeURIComponent('SELECT A, B, C, D, E, F');
        query = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1e_lcoJCWn_hiuXxoXvahwrq-NKb6DMjPMKcmZfwwIJU/gviz/tq?gid=0&headers=1&tq=' + queryString);
        query.send(function(response) {
            if (response.isError()) {
                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();

            start = new Date();
            start.setDate(start.getDate() - 7);

            var chart = new google.visualization.AreaChart(document.getElementById('wkProgress'));
            var options = {
                isStacked: true,
            };
            chart.draw(data, options);
        });
    }
</script>
