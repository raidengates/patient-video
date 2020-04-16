services.registerPage(file.path, file.name, function (control) {

    let v_EnterCode = $(control).find("[EnterCode]");
    let v_Congratulation = $(control).find("[congratulation]");
    v_EnterCode.hide();
    v_Congratulation.hide();
    let patientInfo;

    ProcessRequest(ws_query.device_Login(), function (data) {
        rows = data[0];
        if (rows[0][0].CheckExistedDevice === "OK") {
            window.location = "#!/app/Home/Pages/home";
        }
        else {
            showControl(v_EnterCode, v_Congratulation, true);
        }
    });

    $(control.txtCode).keyup((e) => {
        e.preventDefault();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            const vali_result = validata($(control.txtCode));
            if (!vali_result.error) {
                toastr["info"](vali_result.msg, "Thông báo");
                return;
            }
            event_login();
        }
    });
    $(control.btn_login).click(() => {
        const vali_result = validata($(control.txtCode));
        if (!vali_result.error) {
            toastr["info"](vali_result.msg, "Thông báo");
            return;
        }
        event_login();
    });
    $(control.btn_CleanCode).click(() => {
        showControl(v_EnterCode, v_Congratulation, true);
    });
    $(control.btn_next).click(() => {
        const MappingPatient = ws_query.checkTheSamePatient($(control.txtCode).val());
        ProcessRequest([MappingPatient], (data) => {
            if (data[0][0].Result === 'Duplicated') {
            }
            else {
                toastr["success"]("Thành công.", "Thông báo");
                window.location = "#!/app/Home/Pages/home";
            }
        });
    });

    const event_login = () => {
        //Kiểm tra Code của bệnh nhân
        const query = ws_query.checkBarcode_User($(control.txtCode).val());
        ProcessRequest([query], function (Result) {
            const status_login = Result[0][0];
            if (status_login.Result == "OK") {
                patientInfo = Result[0][0];
                $(control).find("[data-patient-name]").text(patientInfo.FullName);
                console.log(patientInfo);
                showControl(v_EnterCode, v_Congratulation, false);
            }
            else if (status_login.Result != "OK") {
                toastr["info"]("Mã không chính xác. Vui lòng kiểm tra lại!", "Thông báo")
            }
        });
    }


});

const validata = (ctl) => {
    let msg = "";
    let error = true;
    if (ctl.val().length < 8) {
        error = false;
        msg += "Mã bao gồm 8 ký tự !!!. </br>";
    }
    return { error, msg };
}
const ws_query = {
    checkBarcode_User: (_val) => new DataQuery("ws_checkBarcode_UserV2", {
        UserCode: _val,
        DeviceID: services.getItemLocal("DeviceID"),
    }),
    checkTheSamePatient: (_val) => new DataQuery('ws_checkTheSamePatient', {
        UserCode: _val,
        DeviceID: services.getItemLocal("DeviceID"),
    }),
    patientInforByCode: () => new DataQuery('ws_getPatientInforByCode', {
        DeviceID: services.getItemLocal("DeviceID"),
    }),
    device_Login: () => new DataQuery("ws_Device_Login", { DeviceID: services.getItemLocal('DeviceID') }),
    device_Logout: () => new DataQuery("ws_UserPatient_Logout", { DeviceID: services.getItemLocal('DeviceID') }),
}
const showControl = (_ctlEnterCode, _ctlCongratulation, _status = true) => {
    if (_status) {
        _ctlEnterCode.show();
        _ctlCongratulation.hide();
    } else {
        _ctlEnterCode.hide();
        _ctlCongratulation.show();
    }
}




