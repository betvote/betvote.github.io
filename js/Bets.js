// START ADDRESSES
var address_a = "1MKxXQvNjS78WaeZniUBKB5hbGwDSPzBTt"; // SCIOLI
var address_b = "1J6LQKpcYTN5EEs9Ly1sEmNbWx6MFZ4NVT"; // MACRI
// END ADDRESSES

// START BETS
var bet_a_html = "";
var bet_b_html = "";
// END BETS

var addresses_query = address_a+"|"+address_b;

function CargarBets() {

$.getJSON("https://blockchain.info/multiaddr?cors=true&api_code=0fe3c82d-156d-405e-b8d4-eff695003036&active="+addresses_query, function (data) {

 	var data = data;

	var balance_a = data.addresses[0].total_received;
	var balance_b = data.addresses[1].total_received;

	var total_balance_candidates = balance_a+balance_b;

	var profit = 0.80;
	var satoshi = 100000000;

	var bet_a = (total_balance_candidates / balance_a * profit) / (2 / 100 * 25);
	var bet_b = (total_balance_candidates / balance_b * profit) / (2 / 100 * 75);
    
	if (bet_a < 1) {
		bet_a = 1;
	}
	if (bet_b < 1) {
		bet_b = 1;
	}

	var bet_a_html = bet_a.toFixed(2)+" X";
	var bet_b_html = bet_b.toFixed(2)+" X";

	$(".bet"+address_a).html(bet_a_html);
	$(".bet"+address_b).html(bet_b_html);
});
}
