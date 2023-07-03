class helperService {
    formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');

        return year + '-' + month + '-' + day;
    }

    last30daysDateRange() {
        var today = new Date();
        var thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // Calculate 30 days ago
        return [this.formatDate(thirtyDaysAgo), this.formatDate(today)];
    }

    last35daysDateRange() {
        var today = new Date();
        var thirtyFiveDaysAgo = new Date(today.getTime() - 35 * 24 * 60 * 60 * 1000); // Calculate 30 days ago
        return [this.formatDate(thirtyFiveDaysAgo), this.formatDate(today)];
    }

    last7daysDateRange() {
        var today = new Date();
        var sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate 7 days ago
        return [this.formatDate(sevenDaysAgo), this.formatDate(today)];
    }

    last90daysDateRange() {
        var today = new Date();
        var ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000); // Calculate 90 days ago
        return [this.formatDate(ninetyDaysAgo), this.formatDate(today)];
    }

    getDate13MonthsAgoTodayYYYYMMDD() {
        var date = new Date();
        var fromDate = new Date(
            date.getFullYear(),
            date.getMonth() - 12,
            date.getDate()
        );

        return (
            fromDate.getFullYear() +
            '-' +
            (fromDate.getMonth() + 1 > 9
                ? fromDate.getMonth() + 1
                : '0' + (fromDate.getMonth() + 1)) +
            '-' +
            (fromDate.getDate() > 9 ? fromDate.getDate() : '0' + fromDate.getDate())
        );
    }
    getDate2YearsAgoTodayYYYYMMDD() {
        var date = new Date();
        var fromDate = new Date(
            date.getFullYear() - 2,
            date.getMonth(),
            date.getDate()
        );

        return (
            fromDate.getFullYear() +
            '-' +
            (fromDate.getMonth() + 1 > 9
                ? fromDate.getMonth() + 1
                : '0' + (fromDate.getMonth() + 1)) +
            '-' +
            (fromDate.getDate() > 9 ? fromDate.getDate() : '0' + fromDate.getDate())
        );
    }

    getTodayYYYYMMDD() {
        let d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const date = d.getDate();
        return (
            year +
            '-' +
            (month > 10 ? month : '0' + month) +
            '-' +
            (date >= 10 ? date : '0' + date)
        );
    }

    getYesterdayYYYYMMDD() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const padTo2Digits = (num) => {
            return num.toString().padStart(2, '0');
        };
        const formatDate = (yesterday) => {
            return [
                yesterday.getFullYear(),
                padTo2Digits(yesterday.getMonth() + 1),
                padTo2Digits(yesterday.getDate()),
            ].join('-');
        };
        return formatDate(yesterday);
    }

    getFirstAndLastDateOfCurrentMonthYYYYMMDD() {
        var date = new Date();
        var d = new Date(date.getFullYear(), date.getMonth(), 1);
        var ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return [
            // eslint-disable-next-line no-useless-concat
            d.getFullYear() +
                '-' +
                (d.getMonth() + 1 > 10
                    ? d.getMonth() + 1
                    : '0' + (d.getMonth() + 1)) +
                '-' +
                '01',
            ld.getFullYear() +
                '-' +
                (ld.getMonth() + 1 > 10
                    ? ld.getMonth() + 1
                    : '0' + (ld.getMonth() + 1)) +
                '-' +
                ld.getDate(),
        ];
    }

    getDate3MonthsAgoTodayYYYYMMDD() {
        var date = new Date();
        var fromDate = new Date(
            date.getFullYear(),
            date.getMonth() - 3,
            date.getDate()
        );

        return (
            fromDate.getFullYear() +
            '-' +
            (fromDate.getMonth() + 1 > 9
                ? fromDate.getMonth() + 1
                : '0' + (fromDate.getMonth() + 1)) +
            '-' +
            (fromDate.getDate() > 9 ? fromDate.getDate() : '0' + fromDate.getDate())
        );
    }

    getDate6MonthsAgoTodayYYYYMMDD() {
        var date = new Date();
        var fromDate = new Date(
            date.getFullYear(),
            date.getMonth() - 6,
            date.getDate()
        );

        return (
            fromDate.getFullYear() +
            '-' +
            (fromDate.getMonth() + 1 > 9
                ? fromDate.getMonth() + 1
                : '0' + (fromDate.getMonth() + 1)) +
            '-' +
            (fromDate.getDate() > 9 ? fromDate.getDate() : '0' + fromDate.getDate())
        );
    }

    getDate9MonthsAgoTodayYYYYMMDD() {
        var date = new Date();
        var fromDate = new Date(
            date.getFullYear(),
            date.getMonth() - 9,
            date.getDate()
        );

        return (
            fromDate.getFullYear() +
            '-' +
            (fromDate.getMonth() + 1 > 9
                ? fromDate.getMonth() + 1
                : '0' + (fromDate.getMonth() + 1)) +
            '-' +
            (fromDate.getDate() > 9 ? fromDate.getDate() : '0' + fromDate.getDate())
        );
    }

    calculatePastTrend(previous, present) {
        const errCatchTerms = [undefined, null, 'N/A', 'NA'];
        let pastTrend = 0;
        if (
            previous &&
            present &&
            errCatchTerms.indexOf(previous) == -1 &&
            errCatchTerms.indexOf(present) == -1 &&
            (typeof previous === 'string' && typeof present === 'string'
                ? true
                : !isNaN(previous) && !isNaN(present))
        ) {
            let previousValue =
                typeof previous === 'string' ? previous.replace(/,/g, '') : previous;
            let presentValue =
                typeof present === 'string' ? present.replace(/,/g, '') : present;

            pastTrend =
                ((parseInt(presentValue) - parseInt(previousValue)) /
                    parseInt(previousValue)) *
                100;
        }
        if (Number.isNaN(pastTrend)) return 'N/A';
        else if (parseInt(previous) === 0) return 'N/A';
        else return pastTrend.toFixed(2) + '%';
    }

    getSpeceficMonth(date) {
        let d = date;
        const num = Number(d.slice(3, 5));
        let months = [
            'Jan',
            'Feb',
            'Mar',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        return months[num - 1];
    }

    getOneMonthAgo(dateString) {
        var dateParts = dateString.split('/');
        var day = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
        var year = parseInt(dateParts[2]);

        var date = new Date(year, month, day);
        date.setMonth(date.getMonth() - 1);

        // Handle cases where the resulting month doesn't have the same day
        if (date.getDate() !== day) {
            date.setDate(0); // Set the date to the last day of the target month
        }

        var resultDay = date.getDate();
        var resultMonth = date.getMonth() + 1;
        var resultYear = date.getFullYear();

        // Format the result as "dd/mm/yyyy"
        var formattedResult =
            resultYear +
            '-' +
            (resultMonth > 9 ? resultMonth : '0' + resultMonth) +
            '-' +
            (resultDay > 9 ? resultDay : '0' + resultDay);

        var formattedResult1 =
            (resultDay > 9 ? resultDay : '0' + resultDay) +
            '/' +
            (resultMonth > 9 ? resultMonth : '0' + resultMonth) +
            '/' +
            resultYear;

        return [formattedResult, formattedResult1];
    }

    getDateBeforeAndAfter(inputDate) {
        var currentDate = new Date(inputDate);

        // Get the date before
        var dateBefore = new Date(currentDate);
        dateBefore.setDate(currentDate.getDate() - 1);

        // Get the date after
        var dateAfter = new Date(currentDate);
        dateAfter.setDate(currentDate.getDate() + 1);

        // Format the dates as yyyy-mm-dd
        var formattedDateBefore = dateBefore.toISOString().split('T')[0];
        var formattedDateAfter = dateAfter.toISOString().split('T')[0];

        return [formattedDateBefore, formattedDateAfter];
    }

    dataNullChecker(data) {
        let dummy = 0;
        const newData = Object.entries(data.audit);
        newData.map((item, index) => {
            if (typeof item[1] === 'object') {
                if (
                    (!item[1].day || item[1].day == '0') &&
                    (!item[1].total || item[1].total == '0')
                ) {
                    dummy = dummy + 1;
                }
            }
        });
        if (dummy === 4) {
            data = null;
        }
        return data;
    }

    getSplitdate(date, format) {
        var splitarray = date.split('/');
        var splitformat = format.split('/');
        var dateday, datemonth, dateyear;
        for (let i = 0; i < splitarray.length; i++) {
            if (splitformat[i] === 'DD') {
                dateday = splitarray[i];
            } else if (splitformat[i] === 'MM') {
                datemonth = splitarray[i];
            } else {
                dateyear = splitarray[i];
            }
        }

        let Splitdate = {
            day: dateday,
            month: datemonth,
            year: dateyear,
        };
        return Splitdate;
    }
}

export default new helperService();
