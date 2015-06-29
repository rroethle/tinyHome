/* on document load, house image and big house text are hidden.
 * note since we are rounding to the 2 decimal places, adding a third number to material
 * will update the cost even if it's just adding a zero because of the rounding.
 */
$( document ).ready(function() {
    $('#house').hide();
	$('#big-house').hide();
})

// global variables for house cost and construction
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
}

// converts cost to square feet available to build tiny house
function costToSquareFeet(cost){
	var minSquareFeet = cost / costSquareFoot;
	return minSquareFeet;
}

// converts square feet to cost to build tiny house
function squareFeetToCost(squareFeet){
	var minCost = squareFeet * costSquareFoot;
	return minCost;
}

// returns the max square feet from all material by checking each material quantity and seeing what is the minimum square
// feet we can build by diving the value by the quantity needed to build a house for that material.
function getMaxSquareFeet(){
	var lumberSquareFeet = $('#lumber').val() / lumberQuantity;
	var brickSquareFeet = $('#brick').val() / brickQuantity;
	var concreteSquareFeet = $('#concrete').val() / concreteQuantity;
	var decorSquareFeet = $('#decor').val() / decorQuantity;
	
	var minimum = Math.min(lumberSquareFeet, brickSquareFeet, concreteSquareFeet, decorSquareFeet);
	minimum = Math.round(minimum*100)/100;
	return minimum;
}

// adds up the cost for each material item and returns value
function getTotalCost(){
	var lumberCost = $('#lumber').val() * lumberPrice;
	var brickCost = $('#brick').val() * brickPrice;
	var concreteCost = $('#concrete').val() * concretePrice;
	var decorCost = $('#decor').val() * decorPrice;
	var totalCost = lumberCost + brickCost + concreteCost + decorCost;
	return totalCost
}

//calculates updated values for all inputs based on cost change
function displayCost(){
	costInput = $('#cost').val();
	
	var minSquare = costToSquareFeet(costInput);
	var lumSquareFeet = minSquare*lumberQuantity;
	var brickSquareFeet = minSquare*brickQuantity;
	var concreteSquareFeet = minSquare*concreteQuantity;
	var decorSquareFeet = minSquare*decorQuantity;
	
	$('#squareFeet').val(minSquare.toFixed(2));
	$('#lumber').val(lumSquareFeet.toFixed(2));
	$('#brick').val(brickSquareFeet.toFixed(2));
	$('#concrete').val(concreteSquareFeet.toFixed(2));
	$('#decor').val(decorSquareFeet.toFixed(2));
	updateHouse(minSquare);
}

//calculates updated values for all inputs based on square feet change
function displaySquareFeet(){
	var squareFeet = $('#squareFeet').val();
	var costInput = squareFeetToCost(squareFeet);
	var lumSquareFeet = squareFeet*lumberQuantity;
	var brickSquareFeet = squareFeet*brickQuantity;
	var concreteSquareFeet = squareFeet*concreteQuantity;
	var decorSquareFeet = squareFeet*decorQuantity;
	
	$('#cost').val(costInput.toFixed(2));
	$('#lumber').val(lumSquareFeet.toFixed(2));
	$('#brick').val(brickSquareFeet.toFixed(2));
	$('#concrete').val(concreteSquareFeet.toFixed(2));
	$('#decor').val(decorSquareFeet.toFixed(2));
	updateHouse(squareFeet);	
}

/* on material change, re-calculate cost and square feet on loss of focus
 * old cost conditional is used because of rounding issues to 2 decimal places
 * this way a user can click in input and click out without changing any values and 
 * not have cost update
*/
function displayMaterialBlur(){
	var squareFeet = getMaxSquareFeet();
	var totalCost = getTotalCost();
	totalCost = totalCost.toFixed(2)
	
	var oldCost = $('#cost').val()
	if (oldCost != totalCost){
		totalCost = oldCost;
	}
	
	$('#cost').val(totalCost);
	$('#squareFeet').val(squareFeet.toFixed(2));
	updateHouse(squareFeet);
}

// on material change, re-calculate cost and square feet on keyup event
function displayMaterialKeyup(){
	var squareFeet = getMaxSquareFeet();
	var totalCost = getTotalCost();
	totalCost = totalCost.toFixed(2)
	
	$('#cost').val(totalCost);
	$('#squareFeet').val(squareFeet.toFixed(2));
	updateHouse(squareFeet);
}

//updates house image and toggles image and "big house message" to either show or hide based on square foot.
function updateHouse(squareFeet){
	$('#big-house').hide();
	if (squareFeet === ""){
		return false
	};
	var digitCheck = squareFeet.toString();
	var lastCheck = digitCheck.charAt(digitCheck.length-1);
	if (lastCheck === "."){
		return false
	};
	width = squareFeet;
	height = squareFeet;
	if (squareFeet > 1000){
		$('#big-house').show();
		$('#house').hide();
		
	}
	else{
	$('#house').show();
    $("img").attr("width",width);
	$("img").attr("height",height);
	}
}

//checks if value entered is a number and returns true or false based on checking for isNaN or if it's a finite number
function isNumber(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}


/* on keyup event handlers, basic function methodology for each is described below:
 * if text value, clear value. If number calculate input values and display each to 2 decimal places.
 * update house size or "big-house" text if applicable

*/

$("#cost").keyup(function(e){
	var costInput = $('#cost').val();
	if(isNumber(costInput) === false){
		$('#cost').val("");
		return false
	};
	displayCost()
})


$("#squareFeet").keyup(function(e){
	var squareFeet = $('#squareFeet').val()
	if(isNumber(squareFeet) === false){
		$('#squareFeet').val("")
		return false
	};
	displaySquareFeet();
})

// lumber,brick,concrete, and decor use getMaxSquareFeet and get TotalCost to display values.
$("#lumber").keyup(function(e){
	var lumber = $('#lumber').val()
	if(isNumber(lumber) === false){
		$('#lumber').val("")
		return false
	};
	displayMaterialKeyup();

})

$("#brick").keyup(function(e){
	var brick = $('#brick').val()
	if(isNumber(brick) === false){
		$('#brick').val("")
		return false
	};
	displayMaterialKeyup();
})

$("#concrete").keyup(function(e){
	var concrete = $('#concrete').val()
	if(isNumber(concrete) === false){
		$('#concrete').val("")
		return false
	}
	displayMaterialKeyup()
})

$("#decor").keyup(function(e){
	var decor = $('#decor').val()
	if(isNumber(decor) === false){
		$('#decor').val("")
		return false
	}
	displayMaterialKeyup();
})

// end of keyup event handlers

// (blur functions) when input loses focus, event handlers will trigger.
// if more than 2 decimal places are entered, then re-sets value to 2.

$('#cost').blur(function (){
	if ($('#cost').val() === ""){
		$('#cost').val(0);
	};
	displayCost();
	
})

$('#squareFeet').blur(function (){
	if ($('#squareFeet').val() === ""){
		$('#squareFeet').val(0);
	}
	displaySquareFeet()
})

$('#lumber').blur(function (){
	if ($('#lumber').val() === ""){
		$('#lumber').val(0);
	}
	displayMaterialBlur();
	var lumber = Number($('#lumber').val())
	$('#lumber').val(lumber.toFixed(2))
})

$('#brick').blur(function (){
	if ($('#brick').val() === ""){
		$('#brick').val(0);
	}
	displayMaterialBlur();
	var brick = Number($('#brick').val())
	$('#brick').val(brick.toFixed(2))
})

$('#concrete').blur(function (){
	if ($('#concrete').val() === ""){
		$('#concrete').val(0);
	}
	displayMaterialBlur();
	var concrete = Number($('#concrete').val())
	$('#concrete').val(concrete.toFixed(2))
})

$('#decor').blur(function (){
	if ($('#decor').val() === ""){
		$('#decor').val(0);
	};
	displayMaterialBlur();
	var decor = Number($('#decor').val())
	$('#decor').val(decor.toFixed(2))
})

// end of blur functions

