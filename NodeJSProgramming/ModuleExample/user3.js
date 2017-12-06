/* module.exports에는 객체를 그대로 할당할 수 있음 */
var user = {
    getUser: function(){
        return { id: 'test01', name: 'Emrys' };
    },
    group: { id: 'group01', name: 'Friends' }
}

module.exports = user;