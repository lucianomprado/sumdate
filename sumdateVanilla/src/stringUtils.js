/**
 * @class
 */

 class StringUtils {

    static  merge (target, source) {
        let keys = Object.keys(target);
        let tarUnderline = keys[0].indexOf('_') === 0;
        Object.keys(source).forEach((key)=>{
            
            let srcUnderline = key.indexOf('_')===0;
               
            let tmp = tarUnderline?srcUnderline?key:'_'+key:srcUnderline?key.substring(1):key;
            if(typeof (target[tmp]) === 'object' ){

                StringUtils.merge(target[tmp], source[key])
            }else{
                target[tmp] = source[key];
            }
        });
        return target;
    };
    
 }

 module.exports = StringUtils;