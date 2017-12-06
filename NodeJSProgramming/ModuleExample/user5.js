/* module.exports가 사용되면 exports는 무시 */
module.exports = {
    getUser: function() {
        return { id: 'test01', name: 'Emrys' };
    },
    group: { id: 'group01', name: 'Friends' }
}

exports.grouptwo = { id: 'group02', name: 'Family' };