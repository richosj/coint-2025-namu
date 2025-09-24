document.addEventListener('DOMContentLoaded', function() {
	// PC Menu Hover
	const gnbItems = document.querySelectorAll('.gnb-lv1');
	const headerBottom = document.querySelector('.header-bottom');
	
	gnbItems.forEach(item => {
		const submenu = item.querySelector('.gnb-submenu');
		
		if (submenu) {
			item.addEventListener('mouseenter', function() {
				// Hide Other Submenus
				document.querySelectorAll('.gnb-submenu').forEach(sm => {
					sm.style.display = 'none';
					sm.classList.remove('toBottom');
				});
				document.querySelectorAll('.gnb-lv1').forEach(li => {
					li.classList.remove('active');
				});
				
				// Current Submenu Show
				submenu.style.display = 'block';
				submenu.classList.add('toBottom');
				item.classList.add('active');
				headerBottom.style.height = '254px';
			});
			
			item.addEventListener('mouseleave', function() {
				submenu.style.display = 'none';
				submenu.classList.remove('toBottom');
				item.classList.remove('active');
				headerBottom.style.height = '0';
			});
		}
	});

	// Mobile Menu
	const asideMenu = document.querySelector('.aside-menu');
	const asideOpenBtn = document.querySelector('#asideOpen');
	const asideCloseBtn = document.querySelector('#asideClose');
	
	if (asideOpenBtn) {
		asideOpenBtn.addEventListener('click', function() {
			asideMenu.style.display = 'flex';
			document.body.style.overflow = 'hidden';
			setTimeout(() => {
				asideMenu.style.left = '0%';
			}, 10);
		});
	}
	
	if (asideCloseBtn) {
		asideCloseBtn.addEventListener('click', function() {
			asideMenu.style.left = '100%';
			setTimeout(() => {
				asideMenu.style.display = 'none';
				document.body.style.overflow = '';
			}, 300);
		});
	}

	// Mobile Menu Toggle
	const toggleBtns = document.querySelectorAll('.toggle-btn');
	toggleBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			const submenu = btn.closest('li').querySelector('.mobile-menu-submenu');
			if (submenu) {
				const isActive = submenu.style.display === 'block';
				
				document.querySelectorAll('.mobile-menu-submenu').forEach(menu => {
					menu.style.display = 'none';
				});
				document.querySelectorAll('.toggle-btn').forEach(toggleBtn => {
					toggleBtn.classList.remove('active');
				});
				
				// Current Submenu Toggle
				if (!isActive) {
					submenu.style.display = 'block';
					btn.classList.add('active');
				}
			}
		});
	});
});
