const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherClimate = document.querySelector('[data-js="city-weather"]')
const weatherTemperature = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const dayTimeContainer = document.querySelector('[data-js="time"]')

const regex = /^[a-zA-Z]{3,}$/

const insertWeatherInfoIntoDom = (element, info) => {
  element.textContent = info
}

cityForm.addEventListener('submit', async event => {
  event.preventDefault()
  const inputValue = event.target.city.value
  const isValidInput = regex.test(inputValue)

  if (isValidInput) {
    const isCardHidden = cityCard.classList.contains('d-none')

    if (isCardHidden) {
      cityCard.classList.remove('d-none')
    }

    const [{ Key, LocalizedName }] = await getCityData(inputValue)
    const [{ IsDayTime, WeatherText, Temperature }] =
      await getCityCurrentConditions(Key)

    const cityName = LocalizedName
    const isDayTime = IsDayTime
    const cityClimate = WeatherText
    const cityCelsiusTemperature = Math.round(Temperature.Metric.Value)

    dayTimeContainer.src = isDayTime
      ? './src/day.svg'
      : './src/night.svg'

    insertWeatherInfoIntoDom(cityNameContainer, cityName)
    insertWeatherInfoIntoDom(weatherClimate, cityClimate)
    insertWeatherInfoIntoDom(weatherTemperature, cityCelsiusTemperature)
  }

  cityForm.reset()
  cityForm.focus()
})