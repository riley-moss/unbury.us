function Router() {

}


Router.init = function () {


    $("#add-loan").click(function () {
        LoanController.add_loan();
    });

    $("#avalanche-btn").click(function () {
        ApplicationController.changePaymentType(this);
        ApplicationController.auto_calculate();
    });

    $('#nav-balance-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
};


Router.add_monthly_payment_listener = function () {
    $("#monthly-payment").change(function () {
        ApplicationController.monthly_payment_input_change();
        location.hash = LoanController.hashString();
        ApplicationController.auto_calculate();
    });
};

Router.add_loan_destroy_listener = function (id) {
    $("#destroy-button-" + id).click(function () {
        LoanController.remove_loan(id);
        location.hash = LoanController.hashString();
        ApplicationController.auto_calculate();
    });
};

Router.add_loan_input_listeners = function (id) {
    Router.add_loan_input_listener(id, "loan-name");
    Router.add_loan_input_listener(id, "current-balance");
    Router.add_loan_input_listener(id, "minimum-payment");
    Router.add_loan_input_listener(id, "interest-rate");
};


Router.add_loan_input_listener = function (id, field_name) {
    $("#loan" + id).find("input[name=" + field_name + "]").change(function () {
        LoanController.loan_input_change(id, field_name, this);
        ApplicationController.monthly_payment_input_change()
        location.hash = LoanController.hashString();
        ApplicationController.auto_calculate();
    });

};


Router.add_calculate_listener = function () {
    $("#calculate").click(function () {
        ApplicationController.calculate();
    });
};

Router.add_loan_table_result_listener = function (id) {
    $("#loan-head-" + id).click(function () {
        $(this).next().next().toggle();
        if ($(this).find(".glyphicon-chevron-right").length > 0)
        {
            $(this).find(".arrow").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
        }
        else {
            $(this).find(".arrow").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");   
        }
    });
};