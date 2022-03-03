$(function () {

        let Xval = undefined;
        let Yval = undefined;
        let Rval = undefined;

        function checkX() {
            if (Xval === undefined) {
                $('.x-button input').addClass('error-button');
                $('.x-button input').removeClass('button-clicked');
                return false;
            } else {
                $('.x-button input').removeClass('error-button');
                return true;
            }
        }

        function checkY() {
            const Y_MIN = -5;
            const Y_MAX = 5;
            Yval = $('#y-input').val();
            Yval = Yval.trim();
            Yval = Yval.replace(",", ".");
            Yval = parseFloat(Yval);
            if (!isNaN(Yval)) {
                if (Yval < Y_MAX && Yval > Y_MIN) {
                    $('#y-input').removeClass('.error-text');
                    return true;
                } else {
                    $('#y-input').addClass('.error-text');
                    return false;
                }
            } else {
                $('#y-input').addClass('.error-text');
                return false;
            }
        }

        function checkR() {
            if (Rval === undefined) {
                $('.r-button input').addClass('error-button');
                $('.r-button input').removeClass('button-clicked');
                return false;
            } else {
                $('.r-button input').removeClass('error-button');
                return true;
            }
        }

        $('.x-button input').click(function () {
            Xval = $(this).val();
            $('.x-button input').removeClass('.button-clicked');
            $(this).addClass('.button-clicked');
        })

        $('.r-button input').click(function () {
            Rval = $(this).val();
            $('.r-button input').removeClass('.button-clicked');
            $(this).addClass('.button-clicked');
        })

        $('#input-form').on('submit', function (event) {
            event.preventDefault();
            if (checkX() & checkY() & checkR()) {
                $.ajax({
                    url: 'main.php',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        x: Xval,
                        y: Yval,
                        r: Rval,
                        timezone: new Date().getTimezoneOffset()
                    },
                    beforeSend: function () {
                        $('.button').attr('disabled', 'disabled');
                    },
                    success: function (data) {
                        $('.control-buttons input').attr('disabled', false);
                        if (data.isValid) {
                            let responseRow = '<tr>';
                            responseRow += '<td>' + data.x + '</td>';
                            responseRow += '<td>' + data.y + '</td>';
                            responseRow += '<td>' + data.r + '</td>';
                            responseRow += '<td>' + data.currtime + '</td>';
                            responseRow += '<td>' + data.exectime + '</td>';
                            responseRow += '<td>' + data.success + '</td>';
                            $('#result-table').append(responseRow);
                        }

                    }
                })
            }
        })

        $('#input-form').on('reset', function (event) {
            Xval = undefined;
            Yval = undefined;
            Rval = undefined;
            $('#y-input').removeClass('error-text');
            $('.x-button input').removeClass('error-button');
            $('.x-button input').removeClass('button-clicked');
            $('.r-button input').removeClass('error-button');
            $('.r-button input').removeClass('button-clicked');
        })

    }
)