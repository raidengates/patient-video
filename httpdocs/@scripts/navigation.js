$(document).ready(function () {
    if (services.getItem('authorized') == undefined) {
        services.setItem('authorized', services.getItemLocal('authorized'));
        services.setItem('user', services.getItemLocal('user'));
    }
    // console.log("Navigation")
    var root = null;
    var useHash = true; // Defaults to: false
    var hash = '#!'; // Defaults to: '#'
    var router = new Navigo(root, useHash, hash);


    function navigate(route) {

        if (!route)
            return;


        //var authorized = services.getItem("authorized");
        //if (authorized !== "1" && !route.startsWith("shell/") && !route.startsWith("error/")) {
        //    window.location = "#!/shell/login";
        //}
        //if (authorized == "1" && route == "shell/login") {
        //    window.location = "#!/app/firstLogin";
        //}
        //if (route == "shell/login") {
        //    route = "app/firstLogin";
        //}
        //*********************************************
        // console.log("navigate to " + route);
        //*********************************************
        //if (route == "shell/login" ||
        //    route == "shell/logout" ||
        //    route == "shell/change_pwd" ||
        //    route == "shell/register" ||
        //    route == "shell/manage_account" ||
        //    route == "shell/add_account_childs" ||
        //    route.startsWith("error/")) {
        //    // full page

        //    var page = services.createControl(route);
        //    window.document.body.innerHTML = "";
        //    window.document.body.appendChild(page);

        //} else {
            // form with shell
            //var query = new DataQuery("ws_UserPatient_List]", {
            //    UserId: services.getItem('user').ID
            //});
            //ProcessRequest([query], function (data) {
            //    services.setItem('listPatients', data[0]);
                //var shell = services.createControl("shell/main");
                //window.document.body.innerHTML = "";
                //window.document.body.appendChild(shell);

                // limitless_init();
                //$('#navbar_user').show();
                //var screen = services.createControl(route);
                //var shell_main_content = document.getElementById("shell_main_content");

                //shell_main_content.innerHTML = "";
                //shell_main_content.appendChild(screen); 
                var screen = services.createControl(route);
                if (screen != null) {

                    window.document.getElementById('app_root').innerHTML="";
                    window.document.getElementById('app_root').appendChild(screen);
                    // window.document.body.innerHTML = "";
                    // window.document.body.appendChild(screen);
                }
                //calulate max height for content
                //var contentAvailableHeight = $(window).height() - $('#shell_main_content > div > .content').offset().top;
                //$('#shell_main_content > div > .content').attr('style', 'max-height:' + contentAvailableHeight + 'px; overflow-y:auto;');
                
                //if (window.innerWidth <= 375) {
                //    $('.sidebar-menu > div').attr('style', 'max-height:' + (contentAvailableHeight + 80-75) + 'px; overflow-y:auto;');
                //} else {
                //    $('.sidebar-menu > div').attr('style', 'max-height:' + (contentAvailableHeight + 80) + 'px; overflow-y:auto;');
                //}
                //console.log(contentAvailableHeight + 80)
                //if ((route == 'app/menu' || route == 'app/immunization') && window.innerWidth <= 768) {
                //    $('.sidebar-menu').addClass('d-none');
                //}
                //else {
                //    $('.sidebar-menu').removeClass('d-none');
                //}
                //$(".styled").uniform();
            //});
        //}
    }


    for (var i = 0; i < services.controls.length; i++) {
        var item = services.controls[i];
        if (item.route) {
            router.on(item.route, function () {
                navigate(this.route)
            }.bind(item));
        }
    }


    router.on("/", function () {
        navigate("app/firstLogin");
    });

    router.notFound(function () {
        navigate("error/404");
    });

    router.resolve();
});