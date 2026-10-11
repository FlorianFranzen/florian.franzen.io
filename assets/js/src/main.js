(function() {
  var $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),

      menuActive = false

  // Nav is fixed to top
  $('nav').classList.add('nav-fixed')
  $$('nav > .logo, nav > .nav-toggle').forEach(function(el) {
    el.style.visibility = 'visible'
    el.classList.add('show')
    el.classList.remove('hide')
  })

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
})()
