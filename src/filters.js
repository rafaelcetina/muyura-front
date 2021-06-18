import Vue from 'vue'

Vue.filter('printDate', function (value) {
    if (!value) return ''
    return PrintDate(value);
})

Vue.filter('printShortDate', function (value) {
    if (!value) return ''
    return PrintShortDate(value);
})

Vue.filter('printDateHour', function (value) {
    if (!value) return ''
    return PrintDateHour(value);
})

Vue.filter('printMoney', function (value) {
    if (!value) return ''
    return new Intl.NumberFormat('en-US',{ minimumFractionDigits: 2 }).format(value);
})

Vue.filter('printTimeAgo', function (value, suffix  = false) {
    if (!value) return ''
    return moment(value).fromNow(suffix);
})

Vue.filter('printTimeAgoSeconds', function (value, suffix  = false) {
    if (!value) return ''
    return moment.utc(moment().diff(moment(value))).format("HH:mm:ss");

})
