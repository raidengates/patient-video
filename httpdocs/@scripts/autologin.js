
function autologin() {
    var deviceID = services.getItemLocal("DeviceID");
    if (deviceID == null || deviceID == "") {
        deviceID = guid();
        services.setItemLocal("DeviceID", deviceID);
    }
    var query = new DataQuery("ws_Device_Login", {
        DeviceID: deviceID
    });
    ProcessRequest([query], function (data) {
        var rows = data[0];
        if (rows[0][0].CheckExistedDevice === "!OK") {         
            window.location = "#!/app/firstLogin";
        }
        else {
            window.location = "#!/app/Home/Pages/home";
        }
    });
}
autologin();