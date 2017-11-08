var Users = [
    { name: '소녀시대', age: 20 },
    { name: '걸스데이', age: 22 },
    { name: '티아라', age: 23 }
    ];
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수: %d', Users.length);

delete Users[1];
console.log('delete 키워드로 배열 요소 삭제 후');
console.log(Users);


/* delete 키워드는 배열 요소의 공간을 남긴 채 객체만 삭제하기 때문에 splice()를 활용하는 경우가 더 많다. */

Users.splice(1, 0, { name: '애프터스쿨', age: 25 });
console.log('splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users);

Users.splice(2, 1);
console.log('splice()로 인덱스 1의 요소를 1개 삭제한 후');
console.dir(Users);