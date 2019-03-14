var ApplicationController = function () {

};

ApplicationController.changePaymentType = function (context) {
    var button = $(context);
    if (button.attr('id') == "avalanche-btn") {
        if (button.hasClass('btn-default')) {
            button.removeClass('btn-default').addClass('btn-primary');
            window.payment_type = "avalanche";
        }
    }
};

ApplicationController.monthly_payment_input_change = function () {
    var selector = $("#monthly-payment");
    var value = selector.val();
    var min_monthly_payment = 0;
    for (key in window.loans){
        min_monthly_payment += window.loans[key].minimumPayment;
    }
    value = value.replace(/[$,]+/g,"");
    value = ResultsController.precise_round(value,2);
    min_monthly_payment = ResultsController.precise_round(min_monthly_payment,2);
    if ($.isNumeric(value) && Number(value) >= min_monthly_payment) {
        window.monthly_payment = Number(value);
    }
    else {
        window.monthly_payment = min_monthly_payment;
        selector.val(min_monthly_payment);
    }
};


ApplicationController.calculate = function (){
    console.log(Object.size(window.loans));
    if (Object.size(window.loans) == 0){
        alert("Add a loan!");
    }
    else if (!LoanController.valid() ) {
        var results = ResultsController.results();
        GraphController.graph(results);

    }

    else {
        alert("At least one of your loans is invalid!");

    }
};

ApplicationController.auto_calculate = function (){
    console.log(Object.size(window.loans));
    console.log("c: " + !LoanController.valid() );
    if (!LoanController.valid() ) {
        console.log("a: " + !LoanController.valid() );
        var results = ResultsController.results();
        GraphController.graph(results);

    } else {
        console.log("b: " + !LoanController.valid() );
    }
};


Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};