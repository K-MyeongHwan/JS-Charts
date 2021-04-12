$(function () {
    
    let config = {
        // ID of the element in which to draw the chart.
        element: 'myfirstchart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [],
        // The name of the data record attribute that contains x-values.
        xkey: '제목',
        // A list of names of data record attributes that contain y-values.
        ykeys: '누적 총 금액',
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
    };

    $('#date').attr("max", moment(new Date).format('YYYY-MM-DD'));
    $('#search').click(function () {
        document.getElementById("myfirstchart").innerHTML = "";
        let val = $('#date').val();

        if (val == "") {
            swal('경고', '날짜를 입력해주세요.', 'error');
            return;
        }
        let API = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
        //key=f5eef3421c602c6cb7ea224104795888&targetDt=20120101
        let data = {
            key: "f5eef3421c602c6cb7ea224104795888",
            targetDt: moment(val).format('YYYYMMDD')
        }
        let json1 = [];
        let json2 = [];
        $.getJSON(API, data, function (data, textStatus, xhr) {
            $.each(data.boxOfficeResult.dailyBoxOfficeList, function (index, obj) {
                json1.push({ label: obj.movieNm, value: obj.salesAcc });
                json2.push({ y: obj.movieNm, a: obj.salesAcc , b:obj.rank});
            });

            new Morris.Donut({
                // ID of the element in which to draw the chart.
                element: 'myfirstchart',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: json1
            });
        });
    });

});