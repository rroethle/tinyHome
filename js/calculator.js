// global variables
$( document ).ready(function() {
    $('#house').hide()
});

var lumberPrice = 3.0;
var brickPrice = 4.0;
var concretePrice = .5;
var decorPrice = 5.5;

var numWalls = 4;
var lumberWall = 2 * numWalls;
var brickWall = 3 * numWalls;
var decorWall = 1 * numWalls;


var lumberRoof = 1;
var decorRoof = 1;

var decorFloor = 1;
var concreteFloor = 1;

var lumberQuantity = lumberWall + lumberRoof;
var decorQuantity = decorRoof + decorFloor + decorWall;
var concreteQuantity = concreteFloor;
var brickQuantity = brickWall;

var costSquareFoot = buildOneSquare();
//end of global variables





//calculates a basic unit cost for one square foot
function buildOneSquare(){
	var lumberCost = lumberQuantity * lumberPrice;
	var decorCost = decorQuantity * decorPrice;
	var concreteCost = concreteQuantity * concretePrice;
	var brickCost = brickQuantity * brickPrice;
	totalCost = lumberCost + decorCost + concreteCost + brickCost;
	return totalCost;
	
};


function costToSquareFeet(cost){
	var minSquareFeet = cost / costSquareFoot;
	return minSquareFeet
}

function squareFeetToCost(squareFeet){
	var minCost = squareFeet * costSquareFoot;
	return minCost
}


function calcLumber(sqft){
	var minSquareFeet = cost / costSquareFoot;
	return minSquareFeet
}

function getMaxSquareFeet(){
	var lumberSquareFeet = $('#lumber').val() / lumberQuantity
	var brickSquareFeet = $('#brick').val() / brickQuantity
	var concreteSquareFeet = $('#concrete').val() / concreteQuantity
	var decorSquareFeet = $('#decor').val() / decorQuantity
	
	var minimum = Math.min(lumberSquareFeet, brickSquareFeet, concreteSquareFeet, decorSquareFeet)
	minimum = Math.round(minimum*100)/100
	return minimum
}

function getTotalCost(){
	var lumberCost = $('#lumber').val() * lumberPrice
	console.log(lumberCost)
	var brickCost = $('#brick').val() * brickPrice
	console.log(brickCost)
	var concreteCost = $('#concrete').val() * concretePrice
	console.log(concreteCost)
	var decorCost = $('#decor').val() * decorPrice
	console.log(decorCost)
	var totalCost = lumberCost + brickCost + concreteCost + decorCost
	totalCost = "$" + totalCost.toFixed(2)
	return totalCost
}

function updateHouse(squareFeet){
	width = squareFeet;
	height = squareFeet;
	$('#house').show();
    $("img").attr("width",width);
	$("img").attr("height",height);
}

function isNumber(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#cost").keyup(function(e){
	var costInput = $('#cost').val()
	if(isNumber(costInput) === false){
		$('#cost').val("")
		return false
	}
	var minSquare = Math.round(costToSquareFeet(costInput)*100)/100
	var lumSquareFeet = Math.round((minSquare*lumberQuantity)*100)/100
	var brickSquareFeet = Math.round((minSquare*brickQuantity)*100)/100
	var concreteSquareFeet = Math.round((minSquare*concreteQuantity)*100)/100
	var decorSquareFeet = Math.round((minSquare*decorQuantity)*100)/100
	
	$('#squareFeet').val(minSquare)
	$('#lumber').val(lumSquareFeet)
	$('#brick').val(brickSquareFeet)
	$('#concrete').val(concreteSquareFeet)
	$('#decor').val(decorSquareFeet)
	updateHouse(minSquare);
	
});

$("#squareFeet").keyup(function(e){
	var squareFeet = $('#squareFeet').val()
	var costInput = Math.round(squareFeetToCost(squareFeet)*100)/100
	var lumSquareFeet = Math.round((squareFeet*lumberQuantity)*100)/100
	var brickSquareFeet = Math.round((squareFeet*brickQuantity)*100)/100
	var concreteSquareFeet = Math.round((squareFeet*concreteQuantity)*100)/100
	var decorSquareFeet = Math.round((squareFeet*decorQuantity)*100)/100
	
	$('#cost').val(costInput)
	$('#lumber').val(lumSquareFeet)
	$('#brick').val(brickSquareFeet)
	$('#concrete').val(concreteSquareFeet)
	$('#decor').val(decorSquareFeet)
	updateHouse(squareFeet)
});

$("#lumber").keyup(function(e){
	var squareFeet = getMaxSquareFeet();
	var totalCost = getTotalCost();
	$('#cost').val(totalCost)
	$('#squareFeet').val(squareFeet)
	updateHouse(squareFeet)

});

$("#brick").keyup(function(e){
	
	var squareFeet = getMaxSquareFeet();
	var totalCost = getTotalCost();

	$('#cost').val(totalCost)
	$('#squareFeet').val(squareFeet)
	updateHouse(squareFeet)
});

$("#concrete").keyup(function(e){
	
	var squareFeet = getMaxSquareFeet();
	var totalCost = getTotalCost();

	$('#cost').val(totalCost)
	$('#squareFeet').val(squareFeet)
	updateHouse(squareFeet)
});

$("#decor").keyup(function(e){
	
	var squareFeet = getMaxSquareFeet();
	var totalCost = getTotalCost();

	$('#cost').val(totalCost)
	$('#squareFeet').val(squareFeet)
	updateHouse(squareFeet)
});