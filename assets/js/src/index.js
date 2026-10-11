(function() {
  var $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),

      menuActive = false

  // Nav starts at bottom then is fixed to top
  // Logo and hamburger menus fade in and out
  window.onscroll = function() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop,
        windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        navHeight = $('nav').clientHeight

    if (scrollPosition > windowHeight - navHeight) {
      // Nav is fixed to top
      $('nav').classList.add('nav-fixed')
      $$('nav > .logo, nav > .nav-toggle').forEach(function(el) {
        el.style.visibility = 'visible'
        el.classList.add('show')
        el.classList.remove('hide')
      })
    } else {
      // Nav is not fixed
      $('nav').classList.remove('nav-fixed')
      $$('nav > .logo, nav > .nav-toggle').forEach(function(el) {
        el.style.visibility = 'hidden'
        el.classList.add('hide')
        el.classList.remove('show')
      })
    }
  }

  // Open or close the full screen nav; keeps the toggle icon in step with the state
  function setMenu(open) {
    menuActive = open
    $$('.nav-full, main').forEach(function(el) {
      el.classList.toggle('active', open)
    })
    $('.nav-icon img:nth-of-type(1)').style.display = open ? 'none' : 'inline-block'
    $('.nav-icon img:nth-of-type(2)').style.display = open ? 'inline-block' : 'none'
    $('html').style.overflowY = open ? 'hidden' : 'scroll'
  }

  // Full screen nav open on click
  $('.nav-icon').addEventListener('click', function() {
    setMenu(!menuActive)
  })

  // Full screen nav close on click
  $$('.nav-full a').forEach(function(link) {
    link.addEventListener('click', function() {
      setMenu(false)
    })
  })

  // Fix logoBig drawing over nav when click on logoSmall while nav open
  $('.logo').addEventListener('click', function() {
    if (menuActive) setMenu(false)
  })

  // Mobile browsers viewport height bug fix
  function fullMobileViewport() {
    var element = this,
        viewportHeight = window.innerHeight,
        heightChangeTolerance = 100 // Approximate address bar height in Chrome

    $(window).resize(function() {
      if (Math.abs(viewportHeight - window.innerHeight) > heightChangeTolerance) {
        viewportHeight = window.innerHeight
        update()
      }
    })

    function update() {
      element.style.height = (viewportHeight + 'px')
    }

    update()
  }

  $$('header').forEach(function() {
    fullMobileViewport
  })
})()
