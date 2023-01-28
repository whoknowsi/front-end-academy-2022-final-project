import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const dateToMMYYYY = (date) => {
  const options = { month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options)
}

const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) 

const setRandomExperienceOf = async (listContainer) => {
  const count = getRandomBetween(1, 3)

  for (let i = 0; i < count; i++) {
    const randomExp = {
      title: await faker.lorem.words(getRandomBetween(2, 3)),
      date: await faker.date.betweens('2015-01-01T00:00:00.000Z', Date.now(), 2),
      content: await faker.lorem.paragraph()
    }

    const workExperienceContainer = document.createElement('li')
    const workExperienceTitle = document.createElement('h3')
    const workExperienceText = document.createElement('p')
    const workExperienceDate = document.createElement('div')

    workExperienceDate.classList.add('date')

    workExperienceTitle.textContent = randomExp.title
    workExperienceText.textContent = randomExp.content
    workExperienceDate.textContent = `${dateToMMYYYY(randomExp.date[0])} - ${dateToMMYYYY(randomExp.date[1])}`

    workExperienceContainer.appendChild(workExperienceTitle)
    workExperienceContainer.appendChild(workExperienceText)
    workExperienceContainer.appendChild(workExperienceDate)
    listContainer.appendChild(workExperienceContainer)
  }
}

const setRandomListOf = async (listContainer) => {
  const count = getRandomBetween(3, 6)

  for (let i = 0; i < count; i++) {
    const itemList = document.createElement('li')
    itemList.textContent = await faker.lorem.words(getRandomBetween(2, 4))
    listContainer.appendChild(itemList)
  }
}

const setRandomLinksOf = async (listContainer) => {
  const count = getRandomBetween(2, 4)

  for (let i = 0; i < count; i++) {
    const urlContainer = document.createElement('li')
    const url = document.createElement('a')
    const fakeUrl = await faker.internet.url()
    url.href = fakeUrl
    url.target = '_blank'
    url.ref = 'noopener noreferrer'
    url.textContent = fakeUrl
    urlContainer.appendChild(url)
    listContainer.appendChild(urlContainer)
  }
}

const fillContactData = async () => {
  const nameEl = document.querySelector('#name')
  const emailEl = document.querySelector('#email span')
  const ageEl = document.querySelector('#age span')
  const addressEl = document.querySelector('#address span')
  const phoneEl = document.querySelector('#phone span')

  const firstName = await faker.name.firstName('male')
  const lastName = await faker.name.lastName()
  const email = await faker.internet.email(firstName, lastName)
  const age = Math.floor(getRandomBetween(20, 50)) 
  const country = await faker.address.country()
  const city = await faker.address.city()
  const phone = await faker.phone.number('+54 9 11 #### ####')

  nameEl.textContent = `${firstName} ${lastName}`
  emailEl.textContent =  email
  ageEl.textContent = `${age} years old`
  addressEl.textContent = `${city}, ${country}`
  phoneEl.textContent = phone
}

const fillAboutMe = async () => {
  const aboutMeText = document.querySelector('#about-me p')
  const aboutMe = await faker.lorem.paragraph()
  aboutMeText.textContent = aboutMe
}

const fillPortrait = async () => {
  const imgUrl = await faker.image.avatar()  
  const profilePictureEl = document.querySelector('#profile-picture')
  const img = document.createElement('img')
  img.src = imgUrl
  profilePictureEl.appendChild(img)
}

const onClickCertificateButton = (e) => {
  const certificatesList = document.querySelector("#certificates ul")

  if(e.target.innerText === 'View certificates') {
    e.target.textContent = 'Hide certificates'
    certificatesList.style.display = 'block'
  } else {
    e.target.textContent = 'View certificates'
    certificatesList.style.display = 'none'
  }
}

const init = async () => {
  const container = document.querySelector('.container')
  const loader = document.querySelector('.loading')

  await fillPortrait()
  await fillContactData()
  await fillAboutMe()

  const workExperienceList = document.querySelector('#experience ul')
  await setRandomExperienceOf(workExperienceList)

  const educationExperienceList = document.querySelector('#education ul') 
  await setRandomExperienceOf(educationExperienceList)

  const asideSkillsList = document.querySelector('#skills ul')
  await setRandomListOf(asideSkillsList)

  const certificatesList = document.querySelector("#certificates ul")
  await setRandomLinksOf(certificatesList)

  const certificatesButton = document.querySelector('#certificates-button')
  certificatesButton.addEventListener('click', onClickCertificateButton)

  container.style.display = 'flex'
  loader.style.display = 'none'
}

init()