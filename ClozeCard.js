// Constructor function for the 'Cloze Card'.
// Constructor accepts two arguments: `text` and `cloze`.
// The constructed object has a `cloze` property that contains the cloze-deleted portion.
// The constructed object has a `partial` property that contains the partial text.
// The constructed object should have a `fullText` property that contains the full text.
// The constructor logs an error when the cloze deletion does not appear in the input text.


function ClozeCard(text, cloze) {

	if (this instanceof ClozeCard)
	{
		if (text.includes(cloze))
		{
			this.type = "ClozeCard";
			this.fullText = text;
			this.cloze = cloze;
			this.partialText = text.replace(cloze, "........");
		}
		else
		{
			throw "Error: The full text does not contain the cloze string.";
		}
	}
	else
	{
		return new ClozeCard(text, cloze);
	}
};

module.exports = ClozeCard;