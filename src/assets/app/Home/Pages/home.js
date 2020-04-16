
services.registerPage(file.path, file.name, function (control) {
    /*------------------------------------------------------------
        contractor
    ------------------------------------------------------------*/
    ProcessRequest(ws_query.patientInforByCode(), function (data) {
       console.log(data);
       const result = data[0][0];
       $(control).find("[data-name]").text(result.FullName);
    });
    /*------------------------------------------------------------
        client event
    ------------------------------------------------------------*/
    $(control.btn_logout).click(() => {
        ProcessRequest(ws_query.device_Logout(), function (data) {
            toastr["success"]("Thành công!", "Thông báo");
            window.location = "#!/app/firstLogin";
        });
    });
});
const ws_query = {
    device_Logout: () => new DataQuery("ws_UserPatient_Logout", { DeviceID: services.getItemLocal('DeviceID') }),
    patientInforByCode: () => new DataQuery('ws_getPatientInforByCode', {DeviceID: services.getItemLocal("DeviceID"),}),
};