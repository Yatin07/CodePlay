import {firebaseConfig} from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
// const userRegisterForm = document.querySelector('#userRegisterForm');
// const defaultLoginForm = document.querySelector('#defaultLoginForm');
// const forgotForm=document.querySelector('.forgot.form');
const container=document.querySelector('.container');
const signupBtn = document.querySelector('#signupbtn');
const signupBtn1 = document.querySelector('#signupbtn1');
// const anchors = document.querySelectorAll('a');
// anchors.forEach(anchor => {
  // anchor.addEventListener('click', () => {
    // const id = anchor.id;
    // switch(id){
    // case 'loginLabel':
        // userRegisterForm.style.display = 'none';
        // defaultLoginForm.style.display = 'block';
        // forgotForm.style.display = 'none';
        // break;
      // case 'signupLabel':
        // userRegisterForm.style.display = 'block';
        // defaultLoginForm.style.display = 'none';
        // forgotForm.style.display = 'none';
        // break;
      // case 'forgotLabel':
        // userRegisterForm.style.display = 'none';
        // defaultLoginForm.style.display = 'none';
        // forgotForm.style.display = 'block';
        // break;
    // }
  // });
// });
signupBtn.addEventListener('click', () => {
  const name = document.querySelector('#userName').value;
  const userAdress = document.querySelector('#userAddress').value;
  const email = document.querySelector('#userEmail').value.trim();
  const password = document.querySelector('#userPassword').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
        user.sendEmailVerification()
        .then(() => {
          alert('Verification email sent. Please check your inbox and verify your email before signing in.');
        })
        .catch((error) => {
          alert('Error sending verification email: ' + error.message);
        });
        console.log('User data saved to Firestore');
        firestore.collection('users').doc(uid).set({
          name: name,
          userAdress: userAdress,
          email: email,
      })
        // userRegisterForm.style.display = 'none';
        // defaultLoginForm.style.display = 'block';
        // forgotForm.style.display = 'none';
    })
    .catch((error) => {
      alert('Error signing up: '+error.message);
    });
});
signupBtn1.addEventListener('click', () => {
  const name = document.querySelector('#doctorName').value;
  const userhospital = document.querySelector('#doctorHospital').value;
  const userspecialisation = document.querySelector('#doctorSpecialisation').value;
  const email = document.querySelector('#doctorEmail').value.trim();
  const password = document.querySelector('#doctorPassword').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
        user.sendEmailVerification()
        .then(() => {
          alert('Verification email sent. Please check your inbox and verify your email before signing in.');
        })
        .catch((error) => {
          alert('Error sending verification email: ' + error.message);
        });
        console.log('User data saved to Firestore');
        firestore.collection('doctors').doc(uid).set({
          name: name,
          userhospital: userhospital,
          userspecialisation: userspecialisation,
          email: email,
      })
        // userRegisterForm.style.display = 'none';
        // defaultLoginForm.style.display = 'block';
        // forgotForm.style.display = 'none';
    })
    .catch((error) => {
      alert('Error signing up: '+error.message);
    });
});
const loginBtn = document.querySelector('#loginbtn');
loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        alert("Logged In Successfully");
        console.log('User is signed in with a verified email.');
        // add login page here
        // location.href = "signout.html"; 
      } else {
        alert('Please verify your email before signing in.');
      }
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
});
// const forgotBtn=document.querySelector('.forgotbtn');
// forgotBtn.addEventListener('click', () => {
//   const emailForReset = document.querySelector('#forgotinp').value.trim();
//  if (emailForReset.length>0) {
//    auth.sendPasswordResetEmail(emailForReset)
//  .then(() => {
//    alert('Password reset email sent. Please check your inbox to reset your password.');
//         userRegisterForm.style.display = 'none';
//         defaultLoginForm.style.display = 'block';
//         forgotForm.style.display = 'none';
//     })
//     .catch((error) => {
//     alert('Error sending password reset email: ' + error.message);
//   });
//   }
// });
