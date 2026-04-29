// lib/guest.ts

export const getGuestId = () => {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("guestId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("guestId", id);
  }

  return id;
};