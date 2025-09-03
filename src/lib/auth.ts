import { jwtDecode } from "jwt-decode";

export function getClubInfoFromToken() {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // decoded: { userId, email, clubName, adminName, logo, ... }
    return decoded;
  } catch (e) {
    return null;
  }
}
