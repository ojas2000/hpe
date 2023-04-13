import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, set, push, child,get} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCNpGBbXO7Pe4KmE0ZVgSTsvpnc9qS6O9Q",
    authDomain: "evgogreenev.firebaseapp.com",
    projectId: "evgogreenev",
    storageBucket: "evgogreenev.appspot.com",
    messagingSenderId: "374211981988",
    appId: "1:374211981988:web:733a7335d566fee8762c31",
    databaseURL: "https://evgogreenev-default-rtdb.firebaseio.com"
};

// initialize firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
// reference your database

get(ref(db, 'stations/')).then((snapshot) => {
    if (snapshot.exists()) {

        window.localStorage.setItem('firebase',JSON.stringify(snapshot.val()))
    } else {
        console.log("No data available");
    }
}).catch((error) => {
console.error(error);
});

document.getElementById("sub").addEventListener('click', submitForm);


function submitForm(e) {
    e.preventDefault()


    var location = getElementVal("location");
    var reponse = getElementVal("response");
    var mode = getElementVal("form_sel");
    var ev_status
    try {
        ev_status = getElementVal("ev_select1")
    }
    finally {
        saveMessages(location, reponse, mode, ev_status);
    }


    //   reset the form
    document.getElementById("review_form").reset();
}

const saveMessages = (location, response, mode, ev_status) => {

    const newPostKey = push(child(ref(db), 'review')).key;
    if (mode == 'ev') {
        set(ref(db, 'reviews/ev/' + newPostKey), {
            location: location,
            review: response,
            ev_status: ev_status
        }).then(() => {
            alert("Feedback Saved")
        }).catch((error) => {
            alert(error)
        });
    }
    else {
        set(ref(db, 'reviews/transit/' + newPostKey), {
            location: location,
            review: response,

        }).then(() => {
            alert("Feedback Saved")
        }).catch((error) => {
            alert(error)
        });
    }

};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};







