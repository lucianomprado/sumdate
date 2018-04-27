
/**

  fazer com que o construtor suporte os seguintes parametros
  sumValues	JSON	N	{"years": 0,"months": 0,"days": 0, "hours": 0, "minutes": 0, "seconds": 0}
  date	String	Date	N
  anotherDate	String	Date	N
  functions	Array	S	['sum']
  pattern	String	N	'DD/MM/YYYY'
  update	boolean	N	false
  internationalisation	JSON	N	{"language": NULL,display: false, divErrorId: undefined,jsonError: true}


*/

var sumdate = (function(config) {

    var params = {
        sumValues: {"years": 0,"months": 0,"days": 0, "hours": 0, "minutes": 0, "seconds": 0},
        date: "",
        anotherDate: "",
        functions: ["sum"],
        pattern: 'DD/MM/YYYY',
        update: false,
        internationalisation: {"language": NULL,display: false, divErrorId: undefined,jsonError: true}
    }
    var core = {};
    return core;
}(config));