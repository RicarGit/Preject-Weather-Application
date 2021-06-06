const APIKey = 'AOAPByhCvKUZmvzPrV7SBSBSOf63LvR2'
const defaultURL = 'http://dataservice.accuweather.com/'

const getCityURL = cityName =>
  `${defaultURL}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherURL = ({ Key }) =>
  `${defaultURL}currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`

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

const getCityCurrentConditions = async cityName => {
  const [cityData] = await getCityData(cityName)
  return fetchData(getWeatherURL(cityData))
}

getCityCurrentConditions('itatiba')