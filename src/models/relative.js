/* Formula 
   n(t)=no*e^(r*t)  

*/

class Relative {

    constructor() {
        this.nt = 0;
        this.t = 0;
        this.r = 0;
        this.no = 0;
        this.medicion = '';
        this.poblation = '';
    }

    setdata(nt = 0, t = 0, r = 0, no = 0, medicion = 'días', poblation = 'Bacterias') {
        this.nt = nt;
        this.t = t;
        this.r = r / 100;
        this.no = no;
        this.medicion = medicion;
        this.poblation = poblation;
    }


    sizeTime(nt = 0) {
        let t = Math.log(nt / this.no) / this.r;
        return parseFloat(t.toFixed(2));
    }

    tasaRelative(n2 = 0, t2 = 0) {
        this.r = Math.log(n2 / this.nt) / (t2 - this.t);
        return this.r;
    }

    inicialSize() {
        this.no = (this.nt / Math.exp(this.t * this.r));
        return parseFloat(this.no.toFixed(2));
    }

    sizeAfter(t = 0) {
        let size = this.no * Math.exp(this.r * t);
        return parseFloat(size.toFixed(2));
    }

    sizeList(t = 0, interval = 1) {
        let list = [];
        let data = {}
        let index = 0;
        for (let i = 0; i <= t; i += interval) {
            let value = this.no * Math.exp(this.r * i);

            data = {
                i,
                'value': parseFloat(value.toFixed(2))
            };
            list[index] = data;
            index++;
        }

        return list;
    }


}


module.exports = Relative;