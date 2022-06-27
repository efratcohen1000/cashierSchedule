
//--------------------------function---------------------------------------
let checkIsempty=function( str)
{
    if((str==="")|| str==="בחר")
        return true;
    return false;
};

let checkLength=function( str,length)
{
    if(str.length===length)
        return false;
    return true;
};

let checkIsDigit=function (str) {
    return isNaN(str);
};
let checkIsCharacters=function (str) {
    var filter = /^[A-Za-z]+$/;
    if(filter.test(str)||str==="")
        return false;
    return true;
};
let checkEmail = function(str){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!filter.test(str))
        return true;
    return false;
};
