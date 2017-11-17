// Constructor function for the 'Basic Card'.
// The constructor acceptz two arguments: `front` and `back`.
// The constructed object has a `front` property that contains the text on the front of the card.
// The constructed object has a `back` property that contains the text on the back of the card.

function BasicCard(front, back) {

	if (this instanceof BasicCard)
	{
		this.type = "BasicCard";
		this.front = front;
    	this.back = back;
    }
    else
    {
    	return new BasicCard(front, back)
    }   
};

module.exports = BasicCard;