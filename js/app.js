const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherClimate = document.querySelector('[data-js="city-weather"]')
const weatherTemperature = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const dayTimeContainer = document.querySelector('[data-js="time"]')
const timeIconContainer = document
  .querySelector('[data-js="time-icon"]')

const img = document.createElement('img')
const regex = /^.{3,}$/

const insertWeatherInfoIntoDom = (element, info) => element.textContent = info

const getWeatherIconSrc = iconID => `./src/icons/${iconID}.svg`

const insertImageIconIntoDom = iconID => {
  img.src = getWeatherIconSrc(iconID)
  timeIconContainer.insertAdjacentElement('afterbegin', img)
}

const showCityCard = cityCard => {
  cityCard.classList.contains('d-none')
    ? cityCard.classList.remove('d-none')
    : null
}

const insertDayTimeImage = isDayTime =>
  dayTimeContainer.src = isDayTime ? './src/day.svg' : './src/night.svg'

const clearFormInput = () => {
  cityForm.reset()
  cityForm.focus()
}

displayCityWeatherInfos = async event => {
  event.preventDefault()
  const inputValue = event.target.city.value.trim()
  const isValidInput = regex.test(inputValue)

  if (isValidInput) {
    showCityCard(cityCard)

    const [{ Key, LocalizedName, AdministrativeArea }] = await
      getCityData(inputValue)
    const [{ IsDayTime, WeatherText, Temperature, WeatherIcon }] = await
      getCityCurrentConditions(Key)

    const cityName = `${LocalizedName} / ${AdministrativeArea.ID}`
    const isDayTime = IsDayTime
    const cityClimate = WeatherText
    const cityCelsiusTemperature = Math.round(Temperature.Metric.Value)

    insertDayTimeImage(isDayTime)
    insertImageIconIntoDom(WeatherIcon)
    insertWeatherInfoIntoDom(cityNameContainer, cityName)
    insertWeatherInfoIntoDom(weatherClimate, cityClimate)
    insertWeatherInfoIntoDom(weatherTemperature, cityCelsiusTemperature)
  }

  clearFormInput()
}

cityForm.addEventListener('submit', displayCityWeatherInfos)