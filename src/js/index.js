// step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

// TODO 메뉴 추가
// - [ ] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼을 누르면 메뉴가 추가된다.
// - [ ] 에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 메뉴가 추가된다.
// - [ ] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.

function App() {
  // form 태그가 자동으로 전송되는걸 막아준다.
  document
    .querySelector('#espresso-menu-form')
    .addEventListener('submit', e => {
      e.preventDefault()
    })

  // 메뉴의 이름을 입력받는건
  document
    .querySelector('#espresso-menu-name')
    .addEventListener('keydown', e => {
      if (e.key == 'Enter') {
        console.log(document.querySelector('#espresso-menu-name').value)
      }
    })
}
App()

// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
// - [ ] 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

// TODO 메뉴 삭제
// - [ ] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// - [ ] 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
