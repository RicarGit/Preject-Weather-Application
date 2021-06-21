const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherClimate = document.querySelector('[data-js="city-weather"]')
const weatherTemperature = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const dayTimeContainer = document.querySelector('[data-js="time"]')
const timeIconContainer = document
  .querySelector('[data-js="time-icon"]')

const imgElement = document.createElement('img')
const limitInputToThreeOrMoreCharacters = /^.{3,}$/

const getWeatherIconSrc = iconID => `./src/icons/${iconID}.svg`

const insertImageIconIntoWeatherCard = iconID => {
  imgElement.src = getWeatherIconSrc(iconID)
  timeIconContainer.insertAdjacentElement('afterbegin', imgElement)
}

const showCityCard = cityCard => {
  const contaisClassDNone = cityCard.classList.contains('d-none')
  if (contaisClassDNone) {
    cityCard.classList.remove('d-none')
  }
}

const showCityDayTime = isDayTime => {
  dayTimeContainer.src = isDayTime ? './src/day.svg' : './src/night.svg'
  document.body.classList = isDayTime ? 'color: bg-primary' : 'color: bg-dark'
}

const clearFormInput = () => {
  cityForm.reset()
  cityForm.focus()
}

const fetchCityWeatherInfos = async cityName => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ IsDayTime, WeatherText, Temperature, WeatherIcon }] = await
    getCityCurrentConditions(Key)

  return { LocalizedName, IsDayTime, WeatherText, Temperature, WeatherIcon }
}

const getCityWeatherInfos = async cityName => {
  const { LocalizedName, IsDayTime, WeatherText, Temperature, WeatherIcon } =
    await fetchCityWeatherInfos(cityName)
  const cityCelsiusTemperature = Math.round(Temperature.Metric.Value)

  cityNameContainer.textContent = LocalizedName
  weatherClimate.textContent = WeatherText
  weatherTemperature.textContent = cityCelsiusTemperature

  showCityCard(cityCard)
  showCityDayTime(IsDayTime)
  insertImageIconIntoWeatherCard(WeatherIcon)
}

const displayCityWeatherInfos = event => {
  event.preventDefault()

  const inputValue = event.target.city.value.trim()
  const isValidInput = limitInputToThreeOrMoreCharacters.test(inputValue)

  if (isValidInput) {
    getCityWeatherInfos(inputValue)
    localStorage.setItem('cityName', inputValue)
  }

  clearFormInput()
}

const showCityInLocalStorage = () => {
  const localStorageCityName = localStorage.getItem('cityName')

  if (localStorageCityName) {
    getCityWeatherInfos(localStorageCityName)
  }
}

showCityInLocalStorage()
cityForm.addEventListener('submit', displayCityWeatherInfos)