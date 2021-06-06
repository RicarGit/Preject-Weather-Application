const APIKey = 'SBMSWwMZP03GxVDtWSticiY92rGo4NT8'
const userInput = 'Itatiba'

const getLocationURL = userInput => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${userInput}&language=pt-br`

const getLocationKey = async userInput => {
  try {
    const response = await fetch(getLocationURL(userInput))

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados.')
    }

    const [locationData] = await response.json()

    return locationData.Key
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const getCurrentConditionsURL = locationKey => `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${APIKey}&language=pt-br`

const getCityCurrentConditions = async () => {
  const locationKey = await getLocationKey(userInput)
  try {
    const response = await fetch(getCurrentConditionsURL(locationKey))

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados.')
    }

    const [conditionsData] = await response.json()

    const isDayTime = conditionsData.IsDayTime
    const weatherText = conditionsData.WeatherText
    const cityCelsiusTemperature = conditionsData.Temperature.Metric.Value

  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }

}

getLocationKey(userInput)
getCityCurrentConditions()