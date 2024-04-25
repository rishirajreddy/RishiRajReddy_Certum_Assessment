import crypto from "crypto";
let counter = 0;

function generateCustomerID(name) {
  // Take first 3 characters from the name (or less if the name is shorter)
  const namePart = name.substring(0, 3).toUpperCase();

  // Increment the counter for uniqueness
  counter++;

  // Create a SHA256 hash of the name and the counter
  const hash = crypto.createHash("sha256");
  hash.update(name + counter);

  // Get the hashed name in hexadecimal format
  const hashedName = hash.digest("hex");

  // Take 3 characters from the hashed name
  const hashedPart = hashedName.substring(0, 3);

  // Combine the parts to form the customer ID
  const customerID = `DYN${namePart}${hashedPart}`;

  // If the customer ID is shorter than 8 characters, add random hex characters
  if (customerID.length < 8) {
    const remainingLength = 8 - customerID.length;
    const randomHex = crypto
      .randomBytes(Math.ceil(remainingLength / 2))
      .toString("hex");
    const truncatedRandomHex = randomHex.substring(0, remainingLength);
    return customerID + truncatedRandomHex.toUpperCase();
  }

  return customerID.toUpperCase();
}

export default generateCustomerID;
