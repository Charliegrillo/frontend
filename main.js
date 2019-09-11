Vue.prototype.$http = axios;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = false;
const vm = new Vue({
        el: '#app',   
        //Mock data for the value of BTC in USD
    data () {
        return {
                CurrenyUSD: 0,
                CurrenyEURO: 0,
                CurrenyREAL: 0,
                ApiOtraUSD :0,
                ApiOtraBRL :0,
                ApiOtraEUR :0
        }
    },
    created () {
        this.fetchMonedasApi();
        this.timer = setInterval(this.fetchMonedasApi, 5000)
    },
    methods: {
        fetchMonedasApi () {
            this.fetchPrecioMoneda();
            this.fetchApiCambio ();
        },
        fetchPrecioMoneda () {
            this.$http.get('http://localhost:3000/cotizacion/dolar')
            .then(response => {
                this.CurrenyUSD = response.data.precio;
            });
            this.$http.get('http://localhost:3000/cotizacion/real')
            .then(response => {
                this.CurrenyREAL = response.data.precio;
            });
            this.$http.get('http://localhost:3000/cotizacion/euro')
            .then(response => {
                this.CurrenyEURO = response.data.precio;
            });                        
        },
        fetchApiCambio () {
            axios.get('http://data.fixer.io/api/latest?access_key=ee82412d216fd4d04d8044043392c638&format=1'
            ).then(response => {
                this.ApiOtraUSD = response.data.rates.ARS;
                this.ApiOtraEUR = response.data.rates.EUR;
                this.ApiOtraBRL = response.data.rates.BRL;
            });
        },        
        cancelAutoUpdate () { clearInterval(this.timer) }
    },
    beforeDestroy () {
        cancelAutoUpdate()
    }    
});