
// constructor should accept two arguments: `text` and `cloze`.

// The constructed object should have a `cloze` property that contains _only_ the cloze-deleted portion of the text.

// The constructed object should have a `partial` property that contains _only_ the partial text.

// The constructed object should have a `fullText` property that contains _only_ the full text.

// The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text.

// Constructor function for the 'Cloze Card'.

function ClozeCard(text, cloze) {
    this.text = text.split(cloze);
    this.cloze = cloze;

};

module.exports = ClozeCard;