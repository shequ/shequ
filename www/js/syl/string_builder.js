function StringBuilder()
{
this._stringArray = new Array();
}

StringBuilder.prototype.append = function(str)
{
this._stringArray.push(str);
}

StringBuilder.prototype.toString = function(joinGap)
{
return this._stringArray.join(joinGap);
}