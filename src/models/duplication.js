/* Formulas 

   nt= No*2^(t/a)
   no=nt/2^(t/a)

*/
class Duplication {
    constructor() {
        this.nt = '';
        this.t = '';
        this.a = '';
        this.no = '';
        this.medicion = '';
    }

    setdata(nt = 0, t = 0, a = 0, no = 0, medicion = 'días') {
        this.nt = nt;
        this.t = t;
        this.a = a;
        this.no = no;
        this.medicion = medicion;
    }

    inicialSize() {
        this.no = (this.nt / Math.pow(2, (this.t / this.a)));
        return parseFloat(this.no.toFixed(2));
    }

    sizeAfter(t = 0) {
        let size = this.no * Math.pow(2, (t / this.a));
        return parseFloat(size.toFixed(2));
    }

    sizeList(t = 0, interval = 1) {
        let list = [];
        let data = {}
        let index = 0;
        for (let i = 0; i <= t; i += interval) {
            let value = this.no * Math.pow(2, (i / this.a));
            data = {
                i,
                'value': parseFloat(value.toFixed(2))
            };
            list[index] = data;
            index++;
        }

        return list;
    }

    sizeTime(nt = 0) {
        let t = this.a * (Math.log(nt / this.no) / Math.log(2));
        return parseFloat(t.toFixed(2));
    }




}


module.exports = Duplication;