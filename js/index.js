var auth = firebase.auth();
var firestore = firebase.firestore();
var signinform = document.querySelector(".signinform");
var signupform = document.querySelector(".signupform");
var googleBtn = document.querySelector(".googleBtn");

var googleSignin = async () => {
    try {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        var {additionalUserInfo: {isNewUser},user: {displayName, uid, email}} = await firebase.auth().signInWithPopup(googleProvider);
        if(isNewUser){
            var userInfo = {
            fullname: displayName,
            email,
            createdAt: new Date()
        }
        await firestore.collection("users").doc(uid).set(userInfo);
        console.log("done")
        //redirect
        location.assign(`./dashboard.html#${uid}`)
        } else{
            console.log("welcome")
            //redirect
        location.assign(`./dashboard.html#${uid}`)
        }
        
        
    
    } catch (error) {
        console.log(error)
    }
}


var signinformSubmission = async (e) => {
    e.preventDefault();
    try {
    var email = document.querySelector(".signinEmail").value;
    var password = document.querySelector(".signinPassword").value;
    if(email && password){
        var {user: {uid}} = await auth.signInWithEmailAndPassword(email,password);
        var userInfo = await firestore.collection("users").doc(uid).get();
        console.log(userInfo.data());
        //redirect
        location.assign(`./dashboard.html#${uid}`)
    }    
    } catch (error) {
        console.log(error);
    }   
};

var signupformSubmission = async (e) => {
    e.preventDefault();
    try {
    var fullname = document.querySelector(".signupFullName").value;
    var email = document.querySelector(".signupEmail").value;
    var password = document.querySelector(".signupPassword").value;
    if(fullname && email && password){   
        var {user: {uid}} = await auth.createUserWithEmailAndPassword(email,password);
        var userInfo = {
            fullname,
            email,
            createdAt: new Date()
        }
        console.log(userInfo)
        await firestore.collection("users").doc(uid).set(userInfo);
        console.log("done")
        //redirect
        location.assign(`./dashboard.html#${uid}`)
    }
    } catch (error) {
        console.log(error);
    }
};

signinform.addEventListener("submit", (e) => signinformSubmission(e));
signupform.addEventListener("submit", (e) => signupformSubmission(e));
googleBtn.addEventListener("click" , googleSignin)


