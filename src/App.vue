<template>
  <div v-if="!loaded" class="flex column center xcenter">
    <h3 class="cursive">Loading...</h3>
    <loader></loader>
  </div>
  <div id="app" class="flex column" v-else>
    <section id="the-date" class="flex column center xcenter cursive">
      <h1 v-if="ru">20 июня 2019</h1>
      <h1 v-if="en">20th June 2019</h1>
    </section>

    <!-- english invitation text -->
    <section v-if="en" class="invitation flex column xcenter cursive">
      <h1>Save the date!</h1>
      <p class="invText">That’s gonna be our awesome <strong>WEDDING</strong>!</p>
      <h2 class="guestName">{{invitation.name}}</h2>
      <p class="invText">Please, come (despite the weather or borders) to this address</p>
      <p class="address-time text-center">
        English Embankment, 70, St. Peterburg, Russia <br/>
        at 16:00
      </p>
      <div class="card">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.030963291521!2d30.282135216380265!3d59.931628381873665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469630dfe11e4da9%3A0xc9e61f646e5401f5!2sEnglish+Embankment%2C+70%2C+Sankt-Peterburg%2C+Russia%2C+190121!5e0!3m2!1sen!2sse!4v1547679271609" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
    </section>

    <!-- russian invitation text -->
    <section v-if="ru" class="invitation flex column xcenter cursive">
      <p id="clarify">
        *Ию<strong>Ня</strong>, не Ля, месяц <strong>№6.</strong>
        Да, двадцатое - это четверг:)
      </p>
      <h2 class="guestName">{{invitation.name}}</h2>
      <p class="invText">Приглашаем Вас на зажигательную вечеринку, посвященную нашей <strong>СВАДЬБЕ</strong>!</p>
      <p class="invText">Повод для вечеринки весомый, но запоминать его не обязательно. Главное, явиться по адресу:<p/>
      <p class="address-time text-center">
        Английская набережная, д. 70, Санкт-Петербург<br/>
        в 16:00
      </p>
      <div class="card">
        <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.030963291521!2d30.282135216380265!3d59.931628381873665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469630dfe11e4da9%3A0xc9e61f646e5401f5!2sEnglish+Embankment%2C+70%2C+Sankt-Peterburg%2C+Russia%2C+190121!5e0!3m2!1sen!2sse!4v1547679271609" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
    </section>


    <section class="response-form flex column grow1 cursive">
      <!-- inputs when choice hasn't been submitted -->
      <div v-if="!choices.id">
        <div>
          <h1 v-if="en" class="cursive">Will you be able to attend?</h1>
          <h1 v-if="ru" class="cursive">Сможете ли Вы прийти?</h1>
        </div>

        <div v-if="invitation.plusOne">
          <p v-if="en" class="cursive">Will you bring your "plus one"?<br/>
            If yes, please write the name below</p>
          <p v-if="ru" class="cursive">Кто Ваш "плюс один"?</p>

          <input type="text" v-model="choices.extraPerson" placeholder="Name"/>

        </div>

        <div>
          <p v-if="en">Also please leave us a message <br/>if you have any food allergies or prefer vegetarian dishes</p>
          <p v-if="ru">Вы вегетарианец? Не переносите молоко? <br/>Пожалуйста, укажите внизу какой диеты придерживаетесь <br/>
          или есть ли у Вас какие либо пищевые аллергии</p>
          <textarea type="text" rows="6" v-model="choices.feedPreferences"/>
        </div>
        <br/>
        <!-- accept invitation button-->
        <div class="flex row space-between">
          <button v-if="en" class="noButton" @click="sendReply(false)">Not going</button>
          <button v-if="ru" class="noButton" @click="sendReply(false)">Не смогу прийти</button>
          <button v-if="en" class="yesButton" @click="sendReply(true)">Yes, Coming!</button>
          <button v-if="ru" class="yesButton" @click="sendReply(true)">Я приду!</button>
        </div>
        <h1 v-if="ru" class="cursive">Пожалуйста, отправьте нам Ваши ответы до <br/>
          <ins>1 мая 2019</ins></h1>
        <h1 v-if="en" class="cursive">Please submit your answers before <ins>1st of May 2019</ins></h1>
      </div>
      <!-- thanks message when attending and reflecting choices -->
      <div v-if="choices.id && choices.attending">
        <h1 v-if="en" class="cursive">Thank you and see you in Russia! :)</h1>
        <h1 v-if="ru" class="cursive">Спасибо за ответ! С нетерпением ждём Вас! :)</h1>

        <p v-if="en">Dont hesitate to contact us if you have any question</p>
        <p v-if="ru">Если у Вас есть какие либо вопросы, напишите нам и мы с радостью оветим :)</p>

        <p v-if="choices.extraPerson">
          +1 <pre>{{choices.extraPerson}}</pre>
        </p>
        <pre>
          {{choices.feedPreferences}}
        </pre>

      </div>
      <div v-if="choices.id && !choices.attending">
        <h2 v-if="en" class="cursive">
          We're sorry to hear you can't attend.<br/>
          If you change your mind please contact us before 1st may :)
        </h2>
        <h2 v-if="ru" class="cursive">
          Очень жаль что Вы не сможете прийтм<br/>
          Если Вы передумаете, напишите нам до 1 мая:)
        </h2>
      </div>
    </section>

    <!-- picture of us -->
    <!--
    <section class="us flex column xcenter">
      <div class="portrait-container">
        <img src="./assets/olgatony.jpg" class="img-responsive"/>
      </div>
    </section>
    -->

    <section v-if="ru" class="signature cursive flex column xcenter">
      <p>Ольга и Тони :)</p>
    </section>

    <section v-if="en" class="signature cursive flex column">
      <p>Tony & Olga</p>
      <p>P.S. If you need any help with <br/>
      applying for visa to Russia or other<br/>
      questions (accomodation, flights, etc) <br/>
      please let us know<br/>
      and we will be happy to help!</p>
    </section>

  </div>
</template>

<script>
import loader from './components/Loader'
import fb from 'firebase/app'
const db = fb.firestore()

const invitationsCollection = db.collection('invitations')
const repliesCollection = db.collection('replies')

export default {
  name: 'app',
  components: {loader},
  data () {
    return {
      id: null,
      invitation: {},
      loaded: false,
      badInvitation: false,
      choices: {
        // Keys that belong to saved choice
        id: null,
        invitationId: null,
        name: null,
        repliedAt: null,
        // Actual choices the person has.
        attending: ''
      }
    }
  },
  methods: {
    sendReply (attending) {
      this.choices.attending = attending
      let data = Object.assign({},this.choices, {
        // save the invitation-id as reference inside the choice.
        invitationId: this.id,
        // saving this in choices to make it easier to see in database who accepted the invite
        name: this.invitation.name,
        repliedAt: new Date()
      })

      if (!this.choices.id) {
        repliesCollection.add(data)
          .then(doc => {
            return this.$bind('choices', doc)
          })
          .then(() => {
            // eslint-disable-next-line
            console.log('Reply successfully created')
          })
        // eslint-disable-next-line
          .catch(err => console.error('failed to create reply', err))
      } else {
        repliesCollection.doc(this.choices.id).set(data)
          .then(() => {
            // eslint-disable-next-line
            console.log('Reply updated')
          })
        // eslint-disable-next-line
          .catch(err => console.error('failed to update reply', err))
      }
    }
  },
  computed: {
    en () {
      return this.invitation && this.invitation.locale === 'en'
    },

    ru () {
      return this.invitation && this.invitation.locale === 'ru'
    },

    sv () {
      return this.invitation && this.invitation.locale === 'sv'
    },

    hasReplied () {
      return !!this.choices.id
    }
  },
  mounted () {
    const m = window.location.search.match(/^\?([^&]+)/)
    if (!m) return this.badInvitation = true
    const id = m[1]
    this.id = id
    this.$bind('invitation', invitationsCollection.doc(id))
      .then((doc) => {
        return repliesCollection.where('invitationId', '==', doc.id).get()
      })
      .then((snapshot) => {
        if (!snapshot.size) return
        return this.$bind('choices', repliesCollection.doc(snapshot.docs[0].id))
      })
      .then(() => {
        this.loaded = true
      })
  }
}
</script>

<style lang="scss">
@import './assets/palette.scss';
@import './assets/flexi.css';
body {
  background-image: url("./assets/bckgrd.jpg");
  background-size: 100% auto;
  // colors are from palette.scss

  color: black;
  margin: 0;

}
.cursive {
  font-family: 'Caveat', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  p, &p { // font Caveat needs patching, it's really small
    font-size: 2.5em;
  }
}
h1.cursive {
  font-size: 2.5em;
}
.invitation {
  h1, h2 {
    text-align: center;
    font-size: 55px;
  }
}

#the-date {

  h1 {
    color: pink; // gold;
    text-shadow: rgba(darken(pink, 80%), 0.77) 1px 1px 4px;
    font-style: oblique;
  }

  @media (max-width: 740px) {
    h1 { font-size: 43px; }
  }

  @media (min-width: 741px) and (max-width: 1070px) {
    h1 { font-size: 72px; }
  }

  @media (min-width: 1071px) and (max-width: 1580px) {
    h1 { font-size: 100px; }
  }

  @media (min-width: 1581px) {
    h1 { font-size: 150px; }
  }
}

.guestName {
  color: red;
  font-size: 4em;
}

.yesButton {
  background-color: #d5eaa7;
  margin: 8px;
  border: 1px solid #80b040;
  color: #323527;
  padding: 4px 22px;
  border-radius: 5px;
  box-shadow: rgba(0,0,0,0.5) 0px 1px 1px;
  font-size: larger;
  font-weight: bold;
  font-family: 'Caveat', cursive;
}
.noButton {
  background-color: #fcbcbc;
  margin: 8px;
  border: 1px solid #fa8495;
  color: #323527;
  padding: 4px 22px;
  border-radius: 5px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px;
  font-size: larger;
  font-weight: bold;
  font-family: 'Caveat', cursive;
}

textarea {
  width: 100%;
}
.response-form {
  margin-left: 5em;
  max-width: 40%;
}

.signature {
  margin-left: 15em;
}

.address-time {
  font-weight: bold;
  // font-family: 'Open Sans', sans-serif;
  font-family: 'Caveat', cursive;
  font-size: 2.3em !important;
}
.card {
  background-color: white;
  border: 1px solid white;
  padding: 7px;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 2px 4px;
  border-radius: 8px;
  display: inline-block;
}

.portrait-container {
  max-width: 30%;
  margin: 40px;
}

#clarify {
  font-size: 1.5em;
  margin-top: -6.5em;
  margin-bottom: 5em;
}
// Not worth the effort, #clarify positioning.
@media (max-width: 740px) {
  #clarify {
    margin-top: -2.5em;
    margin-bottom: 1em;
    font-size: 1em;
  }
}

@media (min-width: 741px) and (max-width: 1070px) {
  #clarify {
    margin-top: -3.5em;
    margin-bottom: 2em;
    font-size: 1.2em;
  }
}

@media (min-width: 1071px) and (max-width: 1580px) {
  #clarify {
    margin-top: -4.5em;
    margin-bottom: 3em;
  }
}

// Responsive modfications
@media (max-width: 740px) {
  .portrait-container {
    max-width: 70%;
  }
  .invitation h1 { font-size: 2em; }
  .invitation h2 { font-size: 1.5em; }
  h1.cursive, h2.cursive, .cursive p { font-size: 1em; }
  .address-time { font-size: 1em !important; }
  .card { max-width: 80%; iframe { max-width: 100% } }
  .signature { margin-left: 0 ;}
  .response-form { margin-left: 0; max-width: 100%; }
  body {
    padding: 0 20px;
    background-size: 150% auto;
    background-position-x: center;
  }
}

</style>
