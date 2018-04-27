


/**
* @class
*
*/
 class Internationalisation {

    /**
    * Create a internationalisation
    */
    constructor(){
        this._language = new Language();
        this._display = false;
        this._divErrorId = undefined;
        this._jsonError = true;
    };
    /**
    * @return {Language}
    * @see Language
    */
    get language() {
        return this._language;
    }

    /**
    * @param {Language} language
    * @see Language
    */
    set language(language) {

        this._language = language;
    }
    /**
    * @return {boolean}
    */
    get display() {
        return this._display;
    }

    /**
    * @param {boolean} display
    */
    set display(display) {

        this._display = display;
    }
    /**
    * @return {String}
    */
    get divErrorId() {
        return this._divErrorId;
    }

    /**
    * @param {String} divErrorId
    */
    set divErrorId(divErrorId) {

        this._divErrorId = divErrorId;
    }
    /**
    * @return {boolean}
    */
    get jsonError() {
        return this._jsonError;
    }

    /**
    * @param {boolean} jsonError
    */
    set jsonError(jsonError) {

        this._jsonError = jsonError;
    }
};

/**
* @class
*
*/
class Language {

    /**
    * Create a language
    */
    constructor(){

        this._error= 'Error';
        this._invalidDate= 'invalid date';
        this._invalidPattern= 'invalid pattern';
        this._inAnotherDate= 'in another date';
    }
    /**
     * @return {String}
     */
     get error() {
         return this._error;
     }

     /**
     * @param {String} error
     */
     set error(error) {

         this._error = error;
     }
    /**
    * @return {String}
    */
    get invalidDate() {
        return this._invalidDate;
    }

    /**
    * @param {String} error
    */
    set invalidDate(invalidDate) {

        this._invalidDate = invalidDate;
    }
   /**
    * @return {String}
    */
    get invalidPattern() {
        return this._invalidPattern;
    }

    /**
    * @param {String} error
    */
    set invalidPattern(invalidPattern) {

        this._invalidPattern = invalidPattern;
    }
   /**
    * @return {String}
    */
    get inAnotherDate() {

        return this._inAnotherDate;
    }

    /**
    * @param {String} error
    */
    set inAnotherDate(inAnotherDate) {

        this._inAnotherDate = inAnotherDate;
    }
}

module.exports = Internationalisation;