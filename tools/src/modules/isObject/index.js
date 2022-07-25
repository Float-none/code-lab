/**
 * 判断传入数据是否为对象
 *
 * @export
 * @param {*} obj
 * @return {*} 
 */
export default function (obj){
	return Object.prototype.toString.apply(obj) === "[object Object]";
}