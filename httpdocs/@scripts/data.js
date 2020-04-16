function DataQuery(command, parameters) {
    this.Command = command;
    this.Parameters = parameters;
}


function CacheQuery(command, parameters) {
    this.Command = command;
    this.Parameters = parameters;
}


function ProcessRequest(query, success, error) {

    if (Array.isArray(query) === false)
        query = [query];

    $.ajax({
        type: "POST",
        //url: "DataAPI.ashx",
        url: "https://m.chaopatient.com/DataAPI.ashx",
        data: JSON.stringify(query),
        success: function (responseText) {
            if (success != null) {
                success(JSON.parse(responseText));
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }

            if (error != null) {
                alert(msg);
            }
            else {
                alert(msg);
            }
        },
        xhrFields: {
            withCredentials: true
        }
    });

    //ajax({
    //    type: "POST",
    //    //url: "DataAPI.ashx",
    //    url: "http://m.chaopatient.com/DataAPI.ashx",
    //    data: JSON.stringify(query),
    //    success: function (responseText) {
    //        if (success != null) {
    //            success(JSON.parse(responseText));
    //        }
    //    },
    //    error: error
    //});
}
