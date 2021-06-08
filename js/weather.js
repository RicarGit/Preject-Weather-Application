const APIKey = '3CFP8ESOqYIoLyewipQs4zCJlTmPq46b'
const defaultURL = 'http://dataservice.accuweather.com/'

const getCityURL = cityName =>
  `${defaultURL}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherURL = cityKey =>
  `${defaultURL}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados.')
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = cityName => fetchData(getCityURL(cityName))
const getCityCurrentConditions = cityKey => fetchData(getWeatherURL(cityKey))