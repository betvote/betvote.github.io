// START ADDRESSES
var address_a = "1MKxXQvNjS78WaeZniUBKB5hbGwDSPzBTt"; // SCIOLI
var address_b = "1J6LQKpcYTN5EEs9Ly1sEmNbWx6MFZ4NVT"; // MACRI
var address_c = "1NbYpjej4tUG1LoXNcaHXEAv2BrNaE3Qn8"; // MASSA
var address_d = "14ABDAcQ5vXQkKpmNHZfzEb8Ki1Thrr7gy"; // DEL CANO 
var address_e = "15idxQtkbpox9xKDQGxqjoqiqpWMEeTwgJ"; // STOLBIZER
var address_f = "1KnApPxStmyPds8ngsbPm8KFDRB2Rcvt9r"; // SAA
// END ADDRESSES

// START BETS
var bet_a_html = "";
var bet_b_html = "";
var bet_c_html = "";
var bet_d_html = "";
var bet_e_html = "";
var bet_f_html = "";
// END BETS

var addresses_query = address_a+"|"+address_b+"|"+address_c+"|"+address_d+"|"+address_e+"|"+address_f;

function CargarBets() {

$.getJSON("https://blockchain.info/multiaddr?cors=true&api_code=0fe3c82d-156d-405e-b8d4-eff695003036&active="+addresses_query, function (data) {

 	var data = data;

	var balance_a = data.addresses[3].total_received;
	var balance_b = data.addresses[5].total_received;
	var balance_c = data.addresses[0].total_received;
	var balance_d = data.addresses[1].total_received;
	var balance_e = data.addresses[2].total_received;
	var balance_f = data.addresses[4].total_received;

	var total_balance_candidates = balance_a+balance_b+balance_c+balance_d+balance_e+balance_f;

	var profit = 0.98;
	var satoshi = 100000000;

	var bet_a = (total_balance_candidates / balance_a * profit) / (6 / 100 * 39.3);
	var bet_b = (total_balance_candidates / balance_b * profit) / (6 / 100 * 31.2);
	var bet_c = (total_balance_candidates / balance_c * profit) / (6 / 100 * 18.3);
	var bet_d = (total_balance_candidates / balance_d * profit) / (6 / 100 * 2.8);
	var bet_e = (total_balance_candidates / balance_e * profit) / (6 / 100 * 5);
	var bet_f = (total_balance_candidates / balance_f * profit) / (6 / 100 * 3.4);
    
	if (bet_a < 1) {
		bet_a = 1;
	}
	if (bet_b < 1) {
		bet_b = 1;
	}
	if (bet_c < 1) {
		bet_c = 1;
	}
	if (bet_d < 1) {
		bet_d = 1;
	}
	if (bet_e < 1) {
		bet_e = 1;
	}
	if (bet_f < 1) {
		bet_f = 1;
	}																				

	var bet_a_html = bet_a.toFixed(2)+" X";
	var bet_b_html = bet_b.toFixed(2)+" X";
	var bet_d_html = bet_d.toFixed(2)+" X";
	var bet_c_html = bet_c.toFixed(2)+" X";
	var bet_e_html = bet_e.toFixed(2)+" X";
	var bet_f_html = bet_f.toFixed(2)+" X";

	$(".bet"+address_a).html(bet_a_html);
	$(".bet"+address_b).html(bet_b_html);
	$(".bet"+address_c).html(bet_c_html);		
	$(".bet"+address_d).html(bet_d_html);
	$(".bet"+address_e).html(bet_e_html);
	$(".bet"+address_f).html(bet_f_html);	
});
}