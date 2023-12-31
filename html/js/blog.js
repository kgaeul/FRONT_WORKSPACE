
nextButton.addEventListener('click', () => {

    if((currentPage + 1) *imagesPerpage < images.length){
        currentPage++;
        displayImg(currentPage);
        updateButtons();
    }
})

displayImg(currentPage);
updateButtons();
 
 
 //게시글 목록을 가져오고 화면에 나타내기
 function displayPosts() {
    const postlist = document.getElementById('post-list');
    postlist.innerHTML='';

    //localStorage 저장된 항목 수 만큼 반복해서 저장소에 있는 내용을 차례대로 나열하는 for문 작성
    for(let i =0; localStorage.length; i++){
        //localStorage.key(i) : localStorage에서 저장된 항목 중에서  i번째 항목의 key(키 : 이름)은 데이터를 식별하는 역할
        const key = localStorage.key(i);
        
          //  startsWith : 현재 진핸중인 localStorage의 항목의 key(이름)이 post- 라는 이름으로 시작하는 지 확인
          //post-로 시작하는 키를 가진 항목의 게시물 데이터를 자겨오기 위해 설정
        if(key.startsWith('post-')){
            //post- 시작하는 키를 가진 항목의 값을 가져와서 JSON 문자열을 JAVASCRIPT 객체로 가져옴 게시물의 데이터를 나타냄
            const post = JSON.parse(localStorage.getItem(key));
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="#" data-key=${key}>${post.title}</a>`;
            postlist.appendChild(listItem);
        }
    }
    //게시글 링크를 클릭했을 때 해당 게시글을 팝업 창으로 표시하는 이벤트 리스너
    const postLinks = document.querySelectorAll('#post-list a');
    //저장된 링크들을  forEach 라는 반복문을 사용해서 각 링크에 대한 이벤트 리스너를 등록
    postLinks.forEach((link) => {
        //이벤트 리스너는 링크가 클릭될 때 실행
        //preventDefault : 링크클릭의 기본동작을 중지
        //기본 동작 : 새창으로 이동하는 것
        link.addEventListener('click',(e) => {
            e.preventDefault();
            //클릭한 링크의 data-key 속성 값을 가져와서 key 변수에 저장
            //data-key 속성을 위 코드에서 게시물을 식별하기 위해 사용했던 localStorage 키의 속성과 동일
            const key = link.getAttribute('data-key');
            const post = JSON.parse(localStorage.getItem(key));

            //새 창을 열어 게시글 내용 표시
            /*
            window.open(url,name,specs,raplace);
            url : 열릴페이지의 url
            name : popup창 이름을 지정
            specs : 팝업창의 속성 설정을 나타내는 공간
            replace : 브라우저 기록에 대한 옵션
            */
            const popupWindow = window.open('','','width=400,height=400');
            popupWindow.document.write(`<h2>${post.title}</h2>`);
            popupWindow.document.write(`<p>${post.content}</P>`);
        });
    });
}



//addpost 버튼을 클릭했을 때 새창에서 게시글 작성 양식 표시할 수 있도록 설정
/*
게시글 작성 버튼을 클릭하면 새창을 열어 작성할 수 있는 공간을 만들어줌
새 창에 게시글 작성 양식이 나타나고, 사용자는 제목과 내용을 입력할 수 있음
마지막으로 저장 버튼을 클릭하면 새로운 게시물이 localStorage 저장되고 게시물 목록을 추가 갱신
초기에는 항상 이미 저장된 게시물 목록을 표시
    단 방문 목록이 아닌 캐시 삭제를 할 경우 저장된 게시물 목록 또한 삭제됨
*/
document.getElementById('add-post').addEventListener('click',()=>{
    const popupWindow= window.open('','','width=400,height=400');
    const popupDocument = popupWindow.document;

    //게시글 작성 양식
    popupDocument.write('<h2 style="background-color:rgb(233, 229, 216); border-radius:10px; text-align: center;">게시글 작성</h2>');
    popupDocument.write('<input type="text" id ="post-title" placeholder="제목"><br>');
    popupDocument.write('<textarea id ="post-content" placeholder = "내용"></textarea><br>');
    popupDocument.write('<button id ="save-post">저장</button>');

    //저장버튼을 클릭하면 새로운 게시물을 저장하고 목록 갱신
    popupDocument.getElementById('save-post').addEventListener('click',()=>{
        const title = popupDocument.getElementById('post-title').value;
        const content = popupDocument.getElementById('post-content').value;
        
        //게시물 제목과 내용이 비어있지 않은 지 검사 
        //제목과 내용 중 하나라도 입력해야 if 블록 내 코드가 실행 
        //입력필드가 비어있을 때 게시물 저장하지 않도록 하기 위해 작성
        if(title && content) {
            //새로운 게시물을 저장하기 위해 고유한 키(key : 이름) 생성
            //Date.now() 함수를 사용해서 현재사간을 이용해 고유한 키를 생성하며 고유한 키는 localStorage에서 게시물을 식별하는 데 사용
            const postKey = `post-${Date.now()}`;
            const post = {title,content};
            localStorage.setItem(postKey,JSON.stringify(post));
            displayPosts();
            popupWindow.close();

        }
    });
});


document.getElementById('log-in').addEventListener('click',()=>{
    const popupWindow = window.open('','','width=500,height=600');
    const popupDocument = popupWindow.document;

    popupDocument.write('<h2 style="background-color:rgb(233, 229, 216); border-radius:10px; text-align: center;">로그인</h2>');
    popupDocument.write('<input type="text" id = "post-id" placeholder="아이디" style="text-align: center"; ><br> ');
    popupDocument.write('<input type="text" id = "post-pw" placeholder="비밀번호" style="text-align: center"; ><br>');
    popupDocument.write('<button id ="save-post">로그인하기</button>');
})


document.getElementById('find-id').addEventListener('click',()=>{
    const popupWindow = window.open('','','width=500,height=600');
    const popupDocument = popupWindow.document;

    popupDocument.write('<h2 style="background-color:rgb(233, 229, 216); border-radius:10px; text-align: center;">아이디 찾기</h2>');
    popupDocument.write('<input type="text" id ="post-name"  placeholder="이름"><br>');
    popupDocument.write('<input type="text" id ="post-phonenum" placeholder="전화번호"><br>');
    popupDocument.write('<button>아이디 찾기</button>');
})

document.getElementById('find-pw').addEventListener('click',()=>{
    const popupWindow = window.open('','','width=500,height=600');
    const popupDocument = popupWindow.document;

    popupDocument.write('<h2 style="background-color:rgb(233, 229, 216); border-radius:10px; text-align: center;">비밀번호 찾기</h2>');
    popupDocument.write('<input type="text" id ="post-id"  placeholder="아이디"><br>');
    popupDocument.write('<input type="text" id ="post-phonenum" placeholder="전화번호"><br>');
    popupDocument.write('<button>비밀번호 찾기</button>');
})


//초기 게시물 목록 표시
popupWindow.close();

function logout(){
    alert("로그아웃되었습니다.");
}




function submitPassword(){
    var password = document.getElementById("password").value;
    // 정규식을 활용해서 영문자 소/대문자 특수문자 숫자 포함하기 8~32
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
   
   var passwordParttarn= /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
   var errorPW=document.getElementById("pm");

   if(!password.match(passwordParttarn)){
    errorPW.textContent="영문자 소/대문자 특수문자 숫자 포함해서 8~32자 사이로 만드세요";
        return false;
   }else{
    errorPW.textContent="";
 
   }

   var confirmpw = document.getElementById("confirmpassword").value;
    if(password!==confirmpw){
        errorPW.textContent="비밀번호가 일치하지 않습니다.";
        return false;
    }else{
        errorPW.textContent="";
 

    }

    alert("회원가입이 완료되었습니다.");
        return true;
}

var c = document.getElementById('canv'), 
    $ = c.getContext("2d");
var w = c.width = window.innerWidth, 
    h = c.height = window.innerHeight;

Snowy();
function Snowy() {
  var snow, arr = [];
  var num = 600, tsc = 1, sp = 0.5;  //num:눈송이 개수 , tsc:눈송이 가로 변화율, sp:내리는 속도
  var sc = 0.8, t = 10, mv = 20, min = 1;  //sc:눈송이 크기
    for (var i = 0; i < num; ++i) {
      snow = new Flake();
      snow.y = Math.random() * (h + 50);
      snow.x = Math.random() * w;
      snow.t = Math.random() * (Math.PI * 2);
      snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
      snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
      snow.sp = snow.sp < min ? min : snow.sp;
      arr.push(snow);
    }
  go();
  function go(){
    window.requestAnimationFrame(go);
      $.clearRect(0, 0, w, h);
      $.fillStyle = 'hsla(242, 95%, 3%, 1)';
      $.fillRect(0, 0, w, h);
      $.fill();
        for (var i = 0; i < arr.length; ++i) {
          f = arr[i];
          f.t += .05;
          f.t = f.t >= Math.PI * 2 ? 0 : f.t;
          f.y += f.sp;
          f.x += Math.sin(f.t * tsc) * (f.sz * .3);
          if (f.y > h + 50) f.y = -10 - Math.random() * mv;
          if (f.x > w + mv) f.x = - mv;
          if (f.x < - mv) f.x = w + mv;
          f.draw();}
 }
 function Flake() {
   this.draw = function() {
      this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz+8);
      this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
      this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
      $.moveTo(this.x, this.y);
      $.fillStyle = this.g;
      $.beginPath();
      $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
      $.fill();}
  }
}
/*________________________________________*/
window.addEventListener('resize', function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);

