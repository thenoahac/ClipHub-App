const lettersAndSpacesPattern = (word) => {
    return /^[A-Za-z\s]*$/.test(word);
}

module.exports = lettersAndSpacesPattern;