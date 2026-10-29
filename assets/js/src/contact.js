(function() {
  var $ = document.querySelector.bind(document)
  var form = $('#form-contact')

  // Stalwart answers {data: {success, details}}, with 200 on success, 400 for
  // a bad submission and 429 once the rate limit is hit.
  form.addEventListener('submit', function(e) {
    e.preventDefault()

    var submit = $('#form-submit'),
        thanks = $('#form-thankyou'),
        error = $('#form-error')

    error.style.display = 'none'
    submit.disabled = true

    fetch(form.action, { method: 'POST', body: new FormData(form) })
      .then(function(response) {
        return response.json().catch(function() { return {} }).then(function(json) {
          if (!response.ok) throw (json.data && json.data.details) || null
        })
      })
      .then(function() {
        form.reset()

        function thankYouFadeIn() {
          // Fade out submit button
          submit.style.visibility = 'hidden'
          submit.classList.add('hide')
          submit.classList.remove('show')

          // Fade in thank you message
          thanks.style.visibility = 'visible'
          thanks.classList.add('show')
          thanks.classList.remove('hide')
          setTimeout(thankYouFadeOut, 6000)
        };

        function thankYouFadeOut() {
          // Fade out thank you message
          thanks.style.visibility = 'hidden'
          thanks.classList.add('hide')
          thanks.classList.remove('show')

          // Fade in submit button
          submit.style.visibility = 'visible'
          submit.classList.add('show')
          submit.classList.remove('hide')
        };

        thankYouFadeIn()
      })
      .catch(function(details) {
        error.textContent = typeof details === 'string' ? details : error.dataset.default
        error.style.display = ''
      })
      .then(function() {
        submit.disabled = false
      })
  })
})()
