const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.updateWatcher = functions.database.ref('/{country}/{id}')
    .onUpdate((change, context) => {
        admin.database().ref("FCM-TOKENS").once("value", function(data) {
            const tokens = Object.keys(data.val());
            const country = context.params.country;
            const categoryId = change.before.val().categoryId;
            
            const message = {
                data: {
                    type: "change-cat",
                    country: country,
                    categoryId: categoryId.toString()
                },
                tokens: tokens,
            }

            admin.messaging().sendMulticast(message)
                .then((response) => {
                    console.log(response.successCount + ' messages were sent successfully');
                });
        })
    });