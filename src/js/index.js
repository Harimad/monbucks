// step2 요구사항 - 상태 관리로 메뉴 관리하기

// TODO localStorage Read & Write
// [ ] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [] 메뉴를 수정할 때
//  - [] 메뉴를 삭제할 때

// [ ] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// [ ] 에스프레소 메뉴판 관리
// [ ] 프라푸치노 메뉴판 관리
// [ ] 블렌디드 메뉴판 관리
// [ ] 티바나 메뉴판 관리
// [ ] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데티어 Read & Rendering
// [ ] 페이지를 최초로 접근할 때는 localStorage에 에스프레스 파일을 읽어온다.
// [ ] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// [ ] 품절 버튼을 추가한다.
// [ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// [ ] 품절 메뉴(클릭이벤트에서 가장가까운 li태그)의 클래스에 sold-out 클래스를 추가한다.

const $ = selector => document.querySelector(selector)

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu))
  },
  getLocalStorage() {
    localStorage.getItem('menu')
  },
}

function App() {
  //상태(변하는 데이터, 이 앱에서 변하는 것이 무엇인가) - 메뉴명
  this.menu = []

  const countMenuName = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `
			총 ${menuCount}개`
  }
  const menuItemTemplate = (espressoMenuName, index) => {
    return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
			<span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
			<button
				type="button"
				class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
			>
				수정
			</button>
			<button
				type="button"
				class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
			>
				삭제
			</button>
		</li>
			`
  }
  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요')
      return
    }
    const espressoMenuName = $('#espresso-menu-name').value
    this.menu.push({ name: espressoMenuName })
    store.setLocalStorage(this.menu)

    const template = this.menu
      .map((item, index) => menuItemTemplate(item.name, index)) //['<li>~</li>', '<li>~</li>', ...]
      .join('') //[<li>~</li><li>~</li><li>~</li>]

    $('#espresso-menu-list').innerHTML = template
    countMenuName()
    $('#espresso-menu-name').value = ''
  }
  const updateMenuName = e => {
    if (e.target.classList.contains('menu-edit-button')) {
      const menuId = e.target.closest('li').dataset.menuId
      const $menuName = e.target.closest('li').querySelector('.menu-name')
      const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
      this.menu[menuId].name = updatedMenuName
      store.setLocalStorage(this.menu)
      $menuName.innerText = updatedMenuName
    }
  }
  const removeMenuNme = e => {
    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('Do you really want to delete?')) {
        e.target.closest('li').remove() // $('#espresso-menu-list').removeChild(e.target.closest('li'))
        countMenuName()
      }
    }
  }
  $('#espresso-menu-form').addEventListener('submit', e => {
    e.preventDefault()
  })
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName)
  $('#espresso-menu-name').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return
    addMenuName()
  })
  $('#espresso-menu-list').addEventListener('click', e => {
    updateMenuName(e)
    removeMenuNme(e)
  })
}
// App()
const app = new App()
