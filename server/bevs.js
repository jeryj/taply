Meteor.methods({
    getBeerStyles: function() {
        var response = HTTP.call( 'GET', 'http://brewerwall.com/api/v1/styles', {} );
        if(response.statusCode==200) {
			var respJson = JSON.parse(response.content);
			console.log("response received.");
			return respJson;
		} else {
			console.log("Response issue: ", response.statusCode);
			var errorJson = JSON.parse(response.content);
			throw new Meteor.Error(response.statusCode, errorJson.error);
		}
    }
});
