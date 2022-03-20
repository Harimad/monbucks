// step2 요구사항 - 상태 관리로 메뉴 관리하기

// TODO localStorage Read & Write
// [x] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [x] 메뉴를 삭제할 때

// [x] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// [x] 에스프레소 메뉴판 관리
// [x] 프라푸치노 메뉴판 관리
// [x] 블렌디드 메뉴판 관리
// [x] 티바나 메뉴판 관리
// [x] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데티어 Read & Rendering
// [x] 페이지를 최초로 접근할 때는 localStorage에 에스프레스 파일을 읽어온다.
// [x] 에스프레소 메뉴를 페이지에 그려준다.

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
    return JSON.parse(localStorage.getItem('menu'))
  },
}

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  }
  this.currentCategory = 'espresso'
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage()
    }
    render()
  }

  const countMenuName = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `
			총 ${menuCount}개`
  }

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
			<li data-menu-id="${index}" class=" menu-list-item d-flex items-center py-2">
			<span class="w-100 pl-2 menu-name ${menuItem.soldOut ? 'sold-out' : ''}">${
          menuItem.name
        }</span>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
      품절
      </button>
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
      })
      .join('')

    $('#menu-list').innerHTML = template
    countMenuName()
  }

  const addMenuName = () => {
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요')
      return
    }
    const menuName = $('#menu-name').value
    this.menu[this.currentCategory].push({ name: menuName })
    store.setLocalStorage(this.menu)

    render()
    $('#menu-name').value = ''
  }
  const updateMenuName = e => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
    this.menu[this.currentCategory][menuId].name = updatedMenuName
    store.setLocalStorage(this.menu)
    $menuName.innerText = updatedMenuName
  }
  const removeMenuName = e => {
    if (confirm('Do you really want to delete?')) {
      const menuId = e.target.closest('li').dataset.menuId
      this.menu[this.currentCategory].splice(menuId, 1)
      store.setLocalStorage(this.menu)
      e.target.closest('li').remove()
      countMenuName()
    }
  }
  const soldOutMenuName = e => {
    const menuId = e.target.closest('li').dataset.menuId
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut
    store.setLocalStorage(this.menu)
    render()
  }
  $('#menu-form').addEventListener('submit', e => {
    e.preventDefault()
  })
  $('#menu-submit-button').addEventListener('click', addMenuName)
  $('#menu-name').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return
    addMenuName()
  })
  $('#menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e)
      return
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e)
      return
    }
    if (e.target.classList.contains('menu-sold-out-button')) {
      soldOutMenuName(e)
      return
    }
  })
  $('nav').addEventListener('click', e => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name')
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName
      this.currentCategory = categoryName
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`
      render()
    }
  })
}

const app = new App()
app.init()
