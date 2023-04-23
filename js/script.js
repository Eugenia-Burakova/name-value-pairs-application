let input = document.getElementById("add-pair__input");

let add = document.querySelector(".add");
let reset = document.querySelector(".reset");
let sortByName = document.querySelector(".sort-by-name");
let sortByValue = document.querySelector(".sort-by-value");
let deleteAll = document.querySelector(".delete");
let showXML = document.querySelector(".show-xml");

let output = document.querySelector(".pair-list__output");
let xmlOutput = document.querySelector(".pair-list__xml-output");

//validation (button add)
add.addEventListener("click", () => {
    if (input.value) { //if there is the text in input field
        let inputText = input.value;
        let inputRegex = /(\d|\w)+=(\d|\w)+/; //pattern for input validation
        let reduceSpace = inputText.replaceAll(" ", ""); //remove all spaces before testing
        let inputTest = inputRegex.test(reduceSpace); //validating (testing) our text

        if (inputTest == true) { //if validation successful
            output.innerHTML += `<div>${reduceSpace}</div>`; //adding <div> into our output
        } else { //if validation failed
            alert("Wrong entry. Enter Name=Value.");
        }
    } else { //if there is no text in the field
        alert("Enter Name=Value.");
    }
});

//button reset, to remove text from input field
reset.addEventListener("click", () => {
    input.value = null;
});

//button delete, to remove text from output field
deleteAll.addEventListener("click", () => {
    output.innerHTML = null;
    xmlOutput.innerHTML = null; //for field with XML
});

//button sortByName
sortByName.addEventListener("click", () => {
    let innerList = output.innerText; //get text for sorting
    let textArr = stringToArray(innerList); //call function to convert string to array
    let sortedNameList = textArr.sort((a, b) => a[0].localeCompare(b[0])); //sort array by name, e.g. by first column ([0])
    let resultName = sortedNameList.map(e => e.join('=')).join('\n'); //concatenating elements of inner array by =, then concatenating result by /n
    output.innerText = resultName; //show the result in output
});

//button sortByValue
sortByValue.addEventListener("click", () => {
    let innerList = output.innerText; //get text for sorting
    let textArr = stringToArray(innerList); //call function to convert string to array
    let sortedValueList = textArr.sort((a, b) => a[1].localeCompare(b[1])); //sort array by value, e.g. by second column ([1])
    let resultValue = sortedValueList.map(e => e.join('=')).join('\n');//concatenating elements of inner array by =, then concatenating result by /n
    output.innerText = resultValue; //show the result in output
});

//button showXML
showXML.addEventListener("click", () => {
    let innerList = output.innerText; //get text for converting to XML
    let textArr = stringToArray(innerList); //calling function to convert string to array
    let resultValue = textArr.map(function (e) {  //calling each element (inner aray) of main array 
        let nameValuePair = "<" + e[0] + ">" + e[1] + "</" + e[0] + ">"; //е[0] -  name1, name2; е[1] - value1, value2 - combining a XML string
        return nameValuePair; //return our XML string (we get main araay with n elements)
    }).join("\n"); // concatenating XML string into one string (in HTML it devides string by brakespace to new line)
    xmlOutput.innerText = resultValue; //show XML result in XML output
});


function stringToArray(listString) { //converts string to array
    let textArr = listString.split("\n").map(function (e) { //divides by \n
        return e.split("="); //divides by =
    })
    return textArr; //return to dimentional array with out elements
};
