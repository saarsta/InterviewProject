$(function () {

    // Setup an event listener to make an API call once auth is complete
    window.onLinkedInLoad = function() {
        IN.Event.on(IN, "auth", getProfileData);
    }

    // Handle the successful return from the API call
    function onSuccess(data) {
        console.log(data);

        $.post('/users', data).done(function (user) {
            debugger
            //if user doesnt exist create it, then rediret
            window.location = "/users/" + user._id;
        });
    }

    // Handle an error response from the API call
    function onError(error) {
        console.log(error);
    }

    // Use the API call wrapper to request the member's basic profile data
    function getProfileData() {
        IN.API.Raw("/people/~:(id,firstName,lastName,email-address,headline)").result(onSuccess).error(onError);
    }
});

