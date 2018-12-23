const admin = require('firebase-admin');

const  serviceAccount = require('./config/itexambag-40797d7fcc34.json');
const questionData = require('./outputData/questionData.json');
//const questionData = require('./outputData/testData.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
db.settings({timestampsInSnapshots: true});

const questionCollection  = db.collection('QUESTIONDATA_PSM');

for(const [index, value] of questionData.entries()){
    questionCollection.add(value)
        .then(ref=>{
            console.log(
                `Added document with ID: ${ref.id} SRL NO : ${index+1}`);
            
        }).catch(err=>{
            console.log('Error : ' + err);
        })
}

