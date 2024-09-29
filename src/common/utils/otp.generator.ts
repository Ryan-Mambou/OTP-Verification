export function generateOtp() {
  const otp = Math.floor(Math.random() * 900000 + 100000);
  return otp.toString();
}

export function generateExpiryDate() {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 5);
  return expiryDate;
}
