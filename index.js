(function () {
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const modalName = document.getElementById('show-user-name')
  const modalAvatar = document.getElementById('show-user-avatar')
  const modalDetail = document.getElementById('show-user-detail')


  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    console.log(data)
    displayDataList(data)
  }).catch((err) => console.log(err))

  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      console.log(event.target)
      console.log(event.target.parentElement.dataset.id)
      showMovie(event.target.parentElement.dataset.id)
    }
  })

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
         <div class="col-sm-2">
          <div class="card mb-1" data-id="${item.id}">
            <img class="card-img-top btn-show-movie" src="${item.avatar}" alt="Card image cap" data-toggle="modal" data-target="#show-movie-modal">
            <h6 class="card-title">${item.name} ${item.surname}</h6>
          </div>
        </div>
            
            
      `
    });
    dataPanel.innerHTML = htmlContent

  }
  function showMovie(id) {
    // get elements


    const USER_URL = INDEX_URL + id
    console.log(USER_URL)

    // send request to show api
    axios.get(USER_URL)
      .then(response => {
        const data = response.data


        // insert data into modal ui//
        modalName.textContent = `Name detal`
        modalAvatar.innerHTML = `<img src="${data.avatar}" class="img-fluid rounded-circle" alt="Responsive image">`
        modalDetail.innerHTML = `
          <h4 class="col-sm-12 text-monospace">${data.name} ${data.surname}</h4>
          <div class="userInfo text-monospace">
            <i class="fas fa-map-marker-alt"> &nbsp;&nbsp; ${data.region}</i><br>
            <i class="fas fa-birthday-cake"> &nbsp;&nbsp; ${data.birthday}</i><br>
            <i class="fas fa-envelope"> &nbsp;&nbsp; ${data.email}</i>    
          </div>  
        `

      })
      .catch(err => console.log(err))
  }


})()