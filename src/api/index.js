export async function loadHotels() {
  try {
    const response = await fetch('http://localhost:3000/hotels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hotels = await response.json();

    if (!response.ok) {
      const message = `An error has occured: ${response.status} - ${response.statusText}`;
      throw new Error(message);
    }
    return hotels;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function loadCountries() {
  try {
    const response = await fetch('http://localhost:3000/countries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const countries = await response.json();

    if (!response.ok) {
      const message = `An error has occured: ${response.status} - ${response.statusText}`;
      throw new Error(message);
    }
    return countries;
  } catch (err) {
    console.error(err);
    return;
  }
}
